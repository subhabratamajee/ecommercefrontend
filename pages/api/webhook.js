import dbConnect from "@/lib/mongoCon";
import Stripe from "stripe";
import { buffer } from "micro";
import Order from "@/Models/Orders";
export default async function handler(req, res) {
  await dbConnect();
  const stripe = new Stripe(process.env.STRIPE_SK);
  const endpointSecret =
    "whsec_e1a9abb803deb6531dbd176ce5fbc2ccda6501fc7be0d9fcfae12d66c3efc76b";
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event?.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === "paid";
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, { paid: true });
      }

      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
}
export const config = {
  api: { bodyParser: false },
};
// wows-right-catchy-cushy
// acct_1NWZxmSAzjVrmxJh
