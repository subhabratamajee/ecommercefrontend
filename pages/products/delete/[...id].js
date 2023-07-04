import Layout from "@/Components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
function Delete() {
  const [productData, setProductData] = useState([]);
  const router = useRouter();
  const id = router.query.id;
  useEffect(() => {
    if (id) {
      axios
        .get("/api/products?id=" + id)
        .then((data) => setProductData(data.data));
    }
  }, []);
  const deleteItem=()=>{
    axios
        .delete("/api/products?id=" + id)
        .then((data) => 
        {
            const dt = data.data;
            router.push('/products')
            dt.success ? toast.success(dt.message) : toast.info(dt.message);
            dt.error ? toast.error(dt.message) : "";
        });
  }

  const back=()=>{
    router.push('/products')
  }

  return (
    <Layout>

      <h1 className="text-xl">Are you want to delete {productData.product} </h1>
      <div className="flex gap-2 m-4  ">
      <button  onClick={deleteItem} className=" px-4 py-1 rounded-md bg-gray-500 text-white">Yes</button>
      <button onClick={back} className="px-4 py-1 rounded-md bg-red-500 text-white" >No</button>
    </div>
    
    </Layout>
  )
}

export default Delete;
