import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import ProductForm from "../productForm";
function Edit() {
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
  return <ProductForm name={"Edit Product"} {...productData} />;
}

export default Edit;
