import React from "react";
import ProductBox from "./ProductBox";

function NewProducts({ products }) {
  return (
    <div>
      <div className=" flex justify-center text-2xl font-semibold m-auto p-4  ">Latest Products</div>
      <div className="flex flex-wrap justify-center">
        {products.length > 0 &&
          products.map((product) => {
            return <ProductBox {...product} key={product._id} />;
          })}
      </div>
    </div>
  );
}

export default NewProducts;
