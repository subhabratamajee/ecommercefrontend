import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import Link from "next/link";

function ProductBox({
  _id,
  product,
  desc,
  category,
  images,
  price,
  properties,
}) {
  const url='/product/'+_id
  const {setCartProducts}=useContext(CartContext)
  const AddToCart=()=>{
setCartProducts(prev=>[...prev,_id])
  }
  return (
    <div className="w-56 shadow-2xl m-2 p-4 rounded-md ">
      <Link className=" justify-center m-auto" href={url}>
        <img
          src={images[0]}
          className="h-32 justify-center m-auto rounded-md"
        />
      </Link>
      <Link className="font-bold text-gray-600" href={url}>{product}</Link>
      {/* <p className="font-semibold">{desc}</p> */}
      <h4 className="text-pink-500 font-bold">₹{price}.00</h4>
      <button className="flex gap-3 font-semibold px-3 py-1 border rounded-md border-green-700 mt-1" onClick={AddToCart} >
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
  );
}

export default ProductBox;
