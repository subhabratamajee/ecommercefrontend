
import React from "react";
// import Product from "@/Models/Product";
function Banner() {
  return (
    <div className="py-1   h-[20rem] md:h-[35rem] w-screen">
      <img
        src="	https://subha-next-ecoomerce.s3.amazonaws.com/1688977032200.avif"
        alt="j"
        className=" absolute rounded-3xl object-cover h-[20rem] md:h-[35rem] w-full   "
      />
      <div className="absolute text-white p-4 md:p-10 mt-16 sm:mt-24  md:mt-72">
        <h1 className=" font-bold text-2xl md:text-5xl  ">
          Meet The Perfect Travel Shoes
        </h1>
        <h4 className=" mt-6 font-semibold">
          Super Packable. Versatile. And All-Day (And Night) Adventure Ready.
        </h4>
        <div className="flex gap-8 mt-4">
          <button className="btn">Buy</button>
          <button className="btn">See All</button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
