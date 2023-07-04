import multiparty from "multiparty";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import mime from "mime-types";
import fs from "fs";
import dbConnect from "@/lib/mongoCon";
import { IsAdmin } from "./auth/[...nextauth]";
const bucketName = "subha-next-ecoomerce";
export default async function handler(req, res) {
  await dbConnect();
  await IsAdmin(req, res);
  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const client = new S3Client({
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY_ID,
    },
  });
  const links = [];
  for (const file of files.file) {
    const exnt = file.originalFilename.split(".").pop();
    const newFilename = Date.now() + "." + exnt;
    await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: newFilename,
        Body: fs.readFileSync(file.path),
        ACL: "public-read",
        ContentType: mime.lookup(file.path),
      })
    );
    const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
    links.push(link);
  }
  return res.status(200).json({ links });
}

export const config = {
  api: { bodyParser: false },
};
