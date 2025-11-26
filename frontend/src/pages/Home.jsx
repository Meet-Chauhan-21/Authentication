import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handelError, handelSuccess } from '../util/tostify';
import axios from 'axios';

const home = () => {
  const [loginUser,setLoginUser] = useState("");
  const [products,setProducts] = useState([]);
  
  const navigate = useNavigate(); 

  useEffect(()=>{
    setLoginUser(localStorage.getItem("loggedInUser"))
  },[])

  const handleLogout =()=>{
    localStorage.removeItem("loggedInUser")
    localStorage.removeItem("token")
    handelSuccess("successfully logout");
    navigate("/login");
  }

   useEffect( ()=>{
      fatchProduct();
   },[])

   const fatchProduct = async ()=>{
    try{  
      
      const product = await axios.get(`${import.meta.env.VITE_API_URL}/product/all-product`,
        {
          headers:{
            "Authorization": localStorage.getItem("token")
          }
        }
      );

      console.log(product.data);
      setProducts(product.data);

    } catch(error){
      console.log(error)
      handelError("something went wronge.!")
    }
   }

  return (
     <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
    {/* Logged in user */}
    <h1 className="text-3xl font-bold text-blue-600 mb-6">
      Welcome, {loginUser}
    </h1>

    {/* Product list container */}
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
        Product List
      </h2>

      {/* Product items */}
      {products.length > 0 ? (
        <ul className="space-y-3">
          {products.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-50 hover:bg-blue-50 px-4 py-2 rounded-lg transition"
            >
              <span className="text-gray-800 font-medium">{item.name}</span>
              <span className="text-green-600 font-semibold">
                ₹{item.price}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">No products found.</p>
      )}
    </div>

    {/* Logout button */}
    <button
      onClick={handleLogout}
      className="mt-8 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
    >
      Logout
    </button>
  </div>
  )
}

export default home