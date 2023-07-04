import Layout from "@/Components/Layout";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
function Categories() {
  const [catName, setCatName] = useState("");
  const [category, setCategory] = useState([]);
  const [parent, setParent] = useState("");
  const [editCategory, setEditCategory] = useState(null);
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);
// console.log(properties[0]);
  const fetchCategories = () => {
    axios.get("/api/categories").then((data) => setCategory(data.data));
  };

  const saveCategory = async (e) => {
    e.preventDefault();
    const data = { catName, parent,properties:properties.map(prop=>({
      name:prop.name,
      values:prop.values.split(','),
    }))};
    if (editCategory) {
      // put
      await axios
        .put("/api/categories", { ...data, _id: editCategory._id })
        .then((response) => {
          const dt = response.data;
          dt.success ? toast.success(dt.message) : toast.info(dt.message);
          dt.error ? toast.error(dt.message) : "";
          //   router.push("/products");
        })
        .catch((response) => {
          toast.error(response.response.data.message);
        });
      setEditCategory(null);
    } else {
      console.log(data);
      // post
      await axios
        .post("/api/categories", {...data})
        .then((response) => {
          const dt = response.data;
          setCatName(dt.data);
          //   router.push("./");
          dt.success ? toast.success(dt.message) : toast.info(dt.message);
          dt.error ? toast.error(dt.message) : "";
        })
        .catch((response) => {
          toast.error(response.response.data.message);
        });
    }
    setCatName("")
    setParent("")
    setProperties([])
    fetchCategories();
  };

  const editCat = (cate) => {
console.log(cate.properties);
    setEditCategory(cate);
    setCatName(cate?.catName);
    setParent(cate?.parent?._id);
    setProperties(cate?.properties?.map(({name,values}) =>({
      name,
      values: values?values?.join(","):"",
    })))

  };

  const deleteCat = (cate) => {
    const id = cate?._id;
    Swal.fire({
      title: "Are you sure?",
      text: "You will be redirected",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#FF0000",
      confirmButtonColor:"#808080",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("/api/categories?id=" + id).then((data) => {
          const dt = data.data;
          fetchCategories();
          dt.success ? toast.success(dt.message) : toast.info(dt.message);
          dt.error ? toast.error(dt.message) : "";
        });
      }
    });
  };
  const AddProperty = () => {
    setProperties((pre) => {
      return [...pre, { name: "", values: "" }];
    });
  };
  const handelPropertyNameChange=(index,prop,newName) => {
    setProperties(pre=>{
      const properties=[...pre];
      properties[index].name=newName;
      return properties;
    })

  }
  const handelPropertyValuesChange=(index,prop,newValues) => {
    setProperties(pre=>{
      const properties=[...pre];
      properties[index].values=newValues;
      return properties;
    })

  }
  const deleteProperties=(deleteIndex)=>{
setProperties(pre=>{
  return [...pre].filter((p,pindex)=>{
    return pindex!==deleteIndex;
  })
})
  }
  return (
    <Layout>
      <h1 className="text-xl font-semibold">Categories</h1>
      <h2>
        {editCategory
          ? "Edit Category " + editCategory?.catName
          : "New Category"}
      </h2>
      <form className="" onSubmit={saveCategory}>
        <div className="flex gap-2">
          <input
            placeholder="Category"
            onChange={(e) => setCatName(e.target.value)}
            value={catName}
          />
          <select onChange={(e) => setParent(e.target.value)} value={parent}>
            <option value={""}>No select Parent</option>
            {category &&
              category?.map((cat) => {
                return (
                  <option value={cat?._id} key={cat?._id}>
                    {cat?.catName}
                  </option>
                );
              })}
          </select>
        </div>
        <div>
          <h1 className="text-md mb-2" >Properties</h1>
          <button onClick={AddProperty} type="button" className="btn bg-gray-400 mb-2">
            Add New Properties
          </button>
          {properties.length > 0 &&
            properties.map((prop,index) => {
              return (
                <div className="flex gap-2 mb-1" key={index}>
                  <input  value={prop.name} onChange={(e)=>{handelPropertyNameChange(index,prop,e.target.value)}} placeholder="Name of the Properties"/>
                  <input   value={prop.values} 
                  onChange={(e)=>{handelPropertyValuesChange(index,prop,e.target.value)}} placeholder="Values, Comma Separated"/>
                  <button type="button"  onClick={()=>deleteProperties(index)}  className="text-white bg-gray-400 rounded-md px-2 p-0 m-1"> Remove</button>
                </div>
              );
            })}
        </div>
        <div className=" ">
          {editCategory&&
         
          <button onClick={()=>{

            setEditCategory(null)
            setCatName("")
            setParent("")
            setProperties([])
          }} type="button" className="btn bg-gray-400  mr-2">Cancel</button>
        }
        <button type="submit" className="btn  bg-blue-900 mb-2">
          save
        </button>
        </div>
      </form>
      {!editCategory &&
      <table>
     
        <thead className="w-full bg-blue-200">
          <tr className="bg-blue-200">
            <td>Category</td>
            <td>Parent Category</td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {category?.map((cat,index) => {
            return (
              <tr key={index}>
                <td>{cat.catName}</td>
                <td>{cat?.parent?.catName}</td>
                <td>
                  <button
                    onClick={() => editCat(cat)} type="button"
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
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => deleteCat(cat)}
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
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
       }
    </Layout>
  );
}

export default Categories;
