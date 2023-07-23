import Product from '@/Models/Product'
import Banner from "@/Components/Banner";
import Nav from "@/Components/Nav";
import Image from "next/image";
import dbConnect from '@/lib/mongoCon';
import NewProducts from '@/Components/NewProducts';
import React from 'react';
export default function Home({newProducts}) {
// console.log(newProducts);
  
  return (
    <main className="">
      <Nav />
      <Banner />
      <NewProducts products={newProducts}/>
    </main>
  );
}
export async function getServerSideProps() {
  await dbConnect();
  const newProducts = await Product.find({}
    , null, {
    sort: { _id: -1 },
    limit: 10,
  });
  // console.log(newProducts);
  return {
    props: {
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
