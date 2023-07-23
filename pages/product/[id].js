import Nav from '@/Components/Nav';
import React,{useState,useContext} from 'react'
import Product from '@/Models/Product'
import dbConnect from '@/lib/mongoCon';
// import Image from 'next/image';
import { CartContext } from "@/Components/CartContext";
function ProductPage({product}) {
  const [activeImage, setActiveImage] = useState(product.images[0])
  const {setCartProducts}=useContext(CartContext)
  const AddToCart=(_id)=>{
setCartProducts(prev=>[...prev,_id])
  }
  return (
    <>
    <Nav/>

    <div className='flex flex-col md:flex-row w-content  '>
      <div className='p-2 m-4 shadow-xl  rounded-md h-content   '>
        <img  src={activeImage} className='m-auto h-64'/>
        <div className='flex gap-2 justify-center'>

        {product.images.map(image=>{return(
          <div   onClick={()=>setActiveImage(image)} key={image}>

          <img src={image}  className={image===activeImage?'h-16 border rounded p-1 cursor-pointer border-blue-400':'h-16 border rounded p-1 cursor-pointer opacity-80'}   />
          </div>
          )})}

          </div>
      </div>
      <div className='p-4 m-4   rounded-md h-content max-h-full mb-auto   '>
        <h1 className='text-2xl font-bold'>{product.product}</h1>
        <p className='text-xl'>{product.desc}</p>
        <div className='flex mt-3 gap-4'>
          <h1 className='text-xl font-semibold'>₹{product.price}</h1>
          <button className="flex gap-3 font-semibold px-3 py-1 border rounded-md border-green-700 mt-1" onClick={()=>AddToCart(product._id)} >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
        Add To Cart
      </button>
        </div>
      </div>
    </div>
        
    </>
  )
}

export default ProductPage;

export async function getServerSideProps(context){
  await dbConnect()
  const {id}=context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    }
  }
}