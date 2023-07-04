import Layout from "@/Components/Layout";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Products() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((data) => setProduct(data.data));
  }, []);

  if (product.length == 0) {
    return (
      <Layout>
        <ToastContainer />
        <Link href={"/products/new"}>
          <button className="bg-blue-900 text-white p-1 px-2 rounded-md hover:shadow-full  ">
            Add New product
          </button>
        </Link>
        <div className="m-2">
          <table>
            <thead>
              <tr>
                <td className="bg-blue-100 "> Product Name</td>
                <td className="bg-blue-100"></td>
                <td className="bg-blue-100"></td>
              </tr>
              <tr></tr>
            </thead>
          </table>
          <h1 className="text-xl text-red-500">No Product to show</h1>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <ToastContainer />
        <Link href={"/products/new"}>
          <button className="bg-blue-900 text-white p-1 px-2 rounded-md hover:shadow-full  ">
            Add New product
          </button>
        </Link>
        <div className="m-2">
          <table>
            <thead>
              <tr>
                <td className="bg-blue-100 "> Product Name</td>
                <td className="bg-blue-100"></td>
                <td className="bg-blue-100"></td>
              </tr>
              <tr></tr>
            </thead>
            <tbody>
              {product.map((pro) => {
                return (
                  <tr key={pro._id}>
                    <td>{pro.product}</td>
                    <td>
                      <Link
                        href={"products/edit/" + pro._id}
                        className="flex gap-1 btn bg-blue-900"
                      >
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
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                        Edit
                      </Link>
                    </td>
                    <td>
                      <Link
                        href={"products/delete/" + pro._id}
                        className="flex gap-1 btn bg-red-600"
                      >
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
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                        Delete
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Layout>
    );
  }
}

export default Products;
