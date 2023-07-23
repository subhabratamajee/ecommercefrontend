import dbConnect from "@/lib/mongoCon";
import Product from '@/Models/Product'
export default async function handler(req,res){
await dbConnect();
const ids=req.body.ids;
const data= await Product.find({_id:ids});
await res.json(data);

}