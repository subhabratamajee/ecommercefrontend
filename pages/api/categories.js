import Category from "@/Models/Category";
import dbConnect from "@/lib/mongoCon";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { AuthOptions, IsAdmin } from "./auth/[...nextauth]";
export default async function handler(req, res) {
  
  
  const { method } = req;
  await dbConnect();
  await IsAdmin(req, res);
  switch (method) {
    case "GET":
      try {
        const category = await Category.find().populate("parent");
        await res.status(200).json(category);
      } catch (error) {
        return res
          .status(400)
          .json({ message: new Error(error).message, success: false });
      }
      break;
    case "POST":
      try {
        const { catName, parent, properties } = req.body;
        console.log(properties);
        const newCategory = new Category({
          catName,
          parent: parent || undefined,
          properties,
        });
        const saveCategory = await newCategory.save();
        return res.status(200).json({
          saveCategory,
          message: "Category is  added successfully",
          success: true,
        });
      } catch (error) {
        return res.status(400).json({
          message: new Error(error).message,
          error: true,
          success: false,
        });
      }
      break;
    case "PUT":
      const { _id, catName, parent, properties } = req.body;
      try {
        const category = await Category.updateOne(
          { _id },
          { catName, parent: parent || undefined, properties }
        );
        await res.status(200).json({
          category,
          message: "Category is  update successfully ",
          success: true,
        });
      } catch (error) {
        return res
          .status(400)
          .json({ message: new Error(error).message, success: false });
      }
      break;
    case "DELETE":
      try {
        const category = await Category.deleteOne({ _id: req.query.id });
        await res.status(200).json({
          category,
          message: "Category is  deleted successfully ",
          success: true,
        });
      } catch (error) {
        return res
          .status(400)
          .json({ message: new Error(error).message, success: false });
      }
      break;
  }
}
