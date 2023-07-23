import Nav from '@/Components/Nav'
import dbConnect from '@/lib/mongoCon'
import React from 'react'
import Product from '@/Models/Product'
import ProductBox from '@/Components/ProductBox'
function Products({products}) {
    // console.log(products);
  return (
    <>
    <Nav/>
    <div className=" flex justify-center text-2xl font-semibold m-auto p-4  ">All Products</div>
      <div className="flex flex-wrap justify-center">
        {products.length > 0 &&
          products.map((product) => {
            return <ProductBox {...product} key={product._id} />;
          })}
      </div>
    </>
  )
}

export default Products
export async function getServerSideProps(){
    await dbConnect()
    const products = await Product.find({}
        ,null, {
        sort: { _id: -1 },
       
      });
    return{
        props:{
            products:JSON.parse(JSON.stringify(products))
        }
    }
}