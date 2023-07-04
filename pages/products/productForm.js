import Layout from "@/Components/Layout";
import Spinner from "@/Components/Spinner";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Categories from "../categories";

function ProductForm({
  _id,
  name,
  product: existingproduct,
  category: assignedcategory,
  properties: assignedproperties,
  images: existingimages,
  desc: existingdesc,
  price: existingprice,
}) {
  console.log(assignedcategory);
  const router = useRouter();
  const [product, setProduct] = useState(existingproduct || "");
  const [category, setCategory] = useState(assignedcategory || "");
  const [productProperty, setProductProperty] = useState(assignedproperties||{})
  const [images, setImages] = useState(existingimages || []);
  const [desc, setDesc] = useState(existingdesc || "");
  const [price, setPrice] = useState(existingprice || "");
  const [loader, setLoader] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/api/categories").then((data) => setCategories(data.data));
  }, []);


  useEffect(() => {
    if (_id) {
      setProduct(existingproduct);
      setCategory(assignedcategory);
      setProductProperty(assignedproperties)
      setImages(existingimages);
      setDesc(existingdesc);
      setPrice(existingprice);
    }
  }, [_id]);

  const SavedProduct = async (e) => {
    e.preventDefault();
    const data = { product, category,properties:productProperty, images, desc, price };
    if (!_id) {
      await axios
        .post("/api/products", data)
        .then((response) => {
          const dt = response.data;
          router.push("./");
          dt.success ? toast.success(dt.message) : toast.info(dt.message);
          dt.error ? toast.error(dt.message) : "";
        })
        .catch((response) => {
          toast.error(response.response.data.message);
        });
    } else {
      await axios
        .put("/api/products", { ...data, _id })
        .then((response) => {
          const dt = response.data;
          dt.success ? toast.success(dt.message) : toast.info(dt.message);
          dt.error ? toast.error(dt.message) : "";
          router.push("/products");
        })
        .catch((response) => {
          toast.error(response.response.data.message);
        });
    }
  };
  const uploadFiles = async (e) => {
    setLoader(true);
    const files = e.target.files;
    if (files.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
    }
    setLoader(false);
  };

  const updateImagesOrder = (images) => {
    setImages(images);
  };

  const AllProperties=[];
if(categories.length&&category){
  let catInfo=categories.find(({_id})=>_id===category)
  AllProperties.push(...catInfo?.properties);
  while(catInfo?.parent?._id){
    const parentCatInfo=categories.find(({_id})=>_id===catInfo?.parent?._id)
    AllProperties.push(...parentCatInfo?.properties);
    catInfo=parentCatInfo;
  } 
}
console.log(AllProperties);
const selectProperty=(name, value)=>{
setProductProperty((pre)=>{
  const newProperties={...pre}
  newProperties[name] = value
return newProperties;
}
)
}
// console.log(categories.length);

  return (
    <Layout>
      <ToastContainer />
      <form onSubmit={SavedProduct}>
        <h1 className="text-xl font-semibold  p-2">{name}</h1>
        <lable>Product Name</lable>
        <input
          placeholder="Product Name"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          required
        />
        <lable>Category</lable>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value={""}>No Category Select</option>
          {categories.map((cat) => {
            return <option value={cat?._id} key={cat?._id}>{cat?.catName}</option>;
          })}
        </select>
        {AllProperties.length>0 && AllProperties.map((prop,index)=>(
          <div className="flex gap-2 flex-col" key={index}>
            

            <lable className="-mb-2 ">{prop.name}</lable>
            <select className="" value={productProperty[prop?.name]||""} onChange={(e)=>selectProperty(prop.name,e.target.value)}>
              {prop.values.map((value,i) =>(
                <option value={value} key={i}>{value}</option>
                ))}
            </select>
          </div>
        ))}

        <lable>Photos</lable>
        <div className="flex gap-1 flex-wrap mb-3 ">
          <ReactSortable
            className="flex gap-1 flex-wrap h-full"
            list={images}
            setList={updateImagesOrder}
          >
            {images.length > 0 &&
              images.map((image, index) => {
                return (
                  <img
                    src={image}
                    key={index}
                    alt={image}
                    className="sm:h-24 h-16 rounded-md"
                  />
                );
              })}
          </ReactSortable>

          <label>
            {loader && <Spinner className="sm:h-24 h-16 text-center" />}
            <div className="border-2 w-20 sm:h-24 h-16 sm:pt-5 pt-2  rounded-md text-center items-center justify-center p-1 bg-gray-200 text-gray-600 cursor-pointer ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 m-auto items-center"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              upload
            </div>
            <input type="file" onChange={uploadFiles} className="hidden" />
          </label>
        </div>
        <lable>Description</lable>
        <textarea
          placeholder="Descreaption"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <lable>Price(in INR)</lable>
        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button className="bg-blue-900 text-white p-1 px-2 rounded-md">
          Save
        </button>
      </form>
    </Layout>
  );
}

export default ProductForm;
