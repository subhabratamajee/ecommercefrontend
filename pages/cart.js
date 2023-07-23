import { CartContext } from "@/Components/CartContext";
import Nav from "@/Components/Nav";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

function Cart() {
  const router=useRouter()
  const { cartProducts, addProduct, removeProduct,clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [isSuccess, setIsSuccess] = useState(false)
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios
        .post("/api/product", { ids: cartProducts })
        .then((response) => setProducts(response.data));
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  const MoreProduct = (id) => {
    addProduct(id);
  };
  const LessProduct = (id) => {
    removeProduct(id);
  };
  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }
const Payment= async()=>{
  const response= await axios.post('/api/checkout',{name,email,mobile,address,city,pin,cartProducts})
  // console.log(response);
  // console.log(cartProducts);
if(response.data.url){
 router.push(response.data.url);
}
}
useEffect(() => {
 if(window.location.href.includes('success')){
  setIsSuccess(true);
  clearCart()
 }
}, [])

if(isSuccess){
  return(
    <>
    <Nav/>
    <div className="text-center flex justify-center">
      <div className="bg-white shadow-xl m-4 p-3 w-96">

      <h1 className="text-2xl font-semibold text-green-500 mb-2">
        Thanks,You Order successfully Created!
      </h1>
      <p className="text-xl">We will confirm with email about order</p>
      </div>
    </div>
    </>
  )
}
  return (
    <>
      <Nav />
      <div className="flex flex-col md:flex-row w-content justify-center ">
        {!cartProducts.length && (
          <div className="p-2 m-4 shadow-xl  rounded-md  md:w-2/3 text-red-600">
            Your Cart is Empty
          </div>
        )}
        {cartProducts.length > 0 && (
          <div className="p-2 m-4 shadow-xl  rounded-md  md:w-2/3">
            <h1 className="text-xl font-bold">Cart</h1>
            {cartProducts.length > 0 &&
              products.map((prod, index) => {
                return (
                  <div className="shadow-sm flex gap-6 p-2" key={index}>
                    <div className="text-center">
                      <div className="w-24">
                        <img src={prod.images[0]} />
                      </div>
                      <div className=" flex gap-2 justify-center ">
                        <button
                          className="border mt-1  rounded-full h-6 w-6"
                          onClick={() => LessProduct(prod._id)}
                        >
                          -
                        </button>
                        <div className="mt-1">
                          {cartProducts.filter((id) => id == prod._id).length}
                        </div>
                        <button
                          className="border mt-1  rounded-full h-6 w-6"
                          onClick={() => MoreProduct(prod._id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-xl">{prod.product}</h1>
                      <p className="font-semibold ">
                        ₹
                        {cartProducts.filter((id) => id == prod._id).length *
                          prod.price}
                      </p>
                    </div>
                  </div>
                );
              })}

            <div className="flex gap-16 justify-end font-semibold text-xl px-4">
              <h1>Total</h1>
              <h1>₹{total}</h1>
            </div>
          </div>
        )}
        <div className="p-2 m-4  shadow-xl  rounded-md md:w-1/3 ">
          <div className=" font-bold text-xl">Order Address</div>
 
            <div className="flex flex-col">
              <input
                className="border rounded-md px-2 py-1 m-1 md:m-2  focus:outline-0 focus:shadow-md"
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                name="name"
              />
              <input
                className="border rounded-md px-2 py-1 m-1 md:m-2  focus:outline-0 focus:shadow-md"
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
              />
              <input
                className="border rounded-md px-2 py-1 m-1 md:m-2  focus:outline-0 focus:shadow-md"
                type="text"
                placeholder="Mobile"
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
                name="mobile"
              />
              <input
                className="border rounded-md px-2 py-1 m-1 md:m-2  focus:outline-0 focus:shadow-md"
                type="text"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                name="address"
              />
              <div className="flex flex-col md:flex-row ">
                <input
                  className="border rounded-md px-2 py-1 m-1 md:m-2  md:w-1/2  focus:outline-0 focus:shadow-md"
                  type="text"
                  placeholder="City"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                  name="city"
                />
                <input
                  className="border rounded-md px-2 py-1 m-1 md:m-2 
                 md:w-1/2 focus:outline-0 focus:shadow-md"
                  type="text"
                  placeholder="Pin Code"
                  onChange={(e) => setPin(e.target.value)}
                  value={pin}
                  name="pin"
                />
              </div>
              <button
                className="bg-blue-900 text-white p-2 rounded-md mx-10 my-2"
                onClick={Payment}
              >
                Continue to Payment
              </button>
            </div>

        </div>
      </div>
    </>
  );
}

export default Cart;
