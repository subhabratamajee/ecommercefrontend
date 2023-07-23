"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { CartContext } from "./CartContext";
// import {BsCartCheckFill} from "react-icons/bs";

function Nav() {
  const { cartProducts } = useContext(CartContext);
  const [top, setTop] = useState(true);
  const [navActive, setNavActive] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 1 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  // console.log(navActive);

  return (
    <header
      className={`text-black body-font z-20  sticky top-0 bg-white ${
        !top && `shadow-lg`
      }`}
    >
      <div className="container  flex   p-2 flex-row items-center">
        <div
          className="px-2 block md:hidden z-20"
          onClick={() => setNavActive(!navActive)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
        <Link
          className="flex title-font font-medium items-center text-black mb-1 md:mb-0"
          href={"/"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-8 h-8  p-1 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Ecommerce</span>
        </Link>
        <nav
          className={
            navActive
              ? "md:ml-auto  absolute  bg-white w-full h-screen top-12 md:top-0 md:h-full  md:relative flex flex-col md:flex-row items-center text-base left-0 md:left-36  "
              : " md:ml-auto  absolute  bg-white w-full h-screen md:h-full   md:relative flex flex-col md:flex-row items-center text-base hidden md:inline-block left-0 md:left-36 "
          }
        >
          <Link href={"/"} className="mr-5 hover:text-gray-200">
            Home
          </Link>
          <Link href={"/products"} className="mr-5 hover:text-gray-200">
            All Product
          </Link>
          <Link href={"/"} className="mr-5 hover:text-gray-200">
            Category
          </Link>
          <Link href={"/"} className="mr-5 hover:text-gray-200">
            Account
          </Link>
        </nav>
        <div className="  inline-flex  hover:text-gray-200 absolute md:block right-0  pr-10  ">
          <Link href={"/cart"} className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <span className="absolute -top-3 left-4  text-orange-500 ">{cartProducts.length}</span>
            cart
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Nav;
