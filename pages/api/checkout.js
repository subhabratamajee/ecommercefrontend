import dbConnect from "@/lib/mongoCon";
import Product from "@/Models/Product";
import Order from "@/Models/Orders";
import Stripe from "stripe";
export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const { name, email, mobile, address, city, pin, cartProducts } =
        req.body;
      await dbConnect();
      const productIds = cartProducts;
      const uniqueId = [...new Set(productIds)];
      const productInfos = await Product.find({ _id: uniqueId });
      let line_items = [];
      for (let productId of uniqueId) {
        const productInfo = productInfos.find(
          (p) => p._id.toString() === productId
        );
        const quantity =
          productIds.filter((id) => id === productId)?.length || 0;
        if (quantity > 0 && productInfo) {
          line_items.push({
            quantity,
            price_data: {
              currency: "INR",
              product_data: { name: productInfo.product },
              unit_amount: productInfo.price * 100,
            },
          });
        }
      }

      const orderDetails = await Order.create({
        line_items,
        name,
        email,
        mobile,
        address,
        city,
        pin,
        paid: false,
      });

      const stripe = new Stripe(process.env.STRIPE_SK);
      const session = await stripe.checkout.sessions.create({
        // payment_method_types: ['card'],
        line_items,
        mode: "payment",
        customer_email: email,
        success_url: process.env.PUBLIC_URL + "/cart?success=1",
        cancel_url: process.env.PUBLIC_URL + "/cart?cancleed=1",
        metadata: { orderId: orderDetails._id.toString() },
      });

      res.json({
        url: session.url,
      });
    } catch (error) {
      return res.json(error);
    }
  }
}
