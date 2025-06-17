import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Products from "../pages/Products";
import CreateProduct from "../pages/admin/CreateProduct";
import  ProductDetails  from "../pages/admin/ProductDetails";
import Cart from "../pages/Cart";
import PageNotFound from "../pages/PageNotFound";

const Mainroutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
         
         
        <Route path="/admin/create-product" element={<CreateProduct />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default Mainroutes;
