import Product from "@/Models/Product";
import dbConnect from "@/lib/mongoCon";
import mongoose from "mongoose";
import { IsAdmin } from "./auth/[...nextauth]";
export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  await IsAdmin(req, res);
  switch (method) {
    case "GET":
      try {
        if (req.query?.id) {
          const product = await Product.findOne({ _id: req.query.id });
          await res.status(200).json(product);
        } else {
          const product = await Product.find({}).lean();
          await res.status(200).json(product);
        }
      } catch (error) {
        return res
        .status(400)
        .json({ message: new Error(error).message, success: false });
      }
      break;
      case "POST":
        try {
        const { product,category,properties,images, desc, price, } = req.body;
        const already = await Product.findOne({ product });
        if (already) {
          return res.status(201).json({
            success: false,
            message: "Product is already added",
          });
        } else {
          const newProduct = new Product({
            product,
            category,
            properties,
            images,
            desc,
            price,
          });
          const saveProduct = await newProduct.save();
          return res.status(200).json({
            message: "Product is  added successfully in the list",
            success: true,
          });
        }
      } catch (error) {
        return res
          .status(400)
          .json({
            message: new Error(error).message,
            error: true,
            success: false,
          });
      }
      break;

      case "PUT":
        const {_id,product,category,properties,images, desc, price,}=req.body;
        try {
            const products = await Product.updateOne({_id},{product,category,properties,images,desc,price});
            await res.status(200).json({products,  message: "Product is  update successfully ",
            success: true,});
        } catch (error) {
          return res
            .status(400)
            .json({ message: new Error(error).message, success: false });
        }
        break;
      case "DELETE":
        try {
            const products = await Product.deleteOne({_id: req.query.id});
            await res.status(200).json({products,  message: "Product is  deleted successfully ",
            success: true,});
        } catch (error) {
          return res
            .status(400)
            .json({ message: new Error(error).message, success: false });
        }
        break;

  }
}
