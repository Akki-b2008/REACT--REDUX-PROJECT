import React, { useState } from "react";
// import {} from '../store/actions/productAction'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncUpdateUser } from "../store/actions/userAction";
import Login from "./Login";

const Products = () => {
  const user = useSelector((state) => state.userReducer.user);
  const products = useSelector((state) => state.productReducer.products);

  const dispatch = useDispatch();

  const AddToCart = (product) => {
    const copyUser = { ...user, cart: [...user.cart] };
    const x = copyUser.cart.findIndex((c) => c.product.id === product.id);

    if (x === -1) {
      copyUser.cart.push({ product: product, quantity: 1 });
    } else {
      copyUser.cart[x] = {
        product: product,
        quantity: copyUser.cart[x].quantity + 1,
      };
    }
    dispatch(asyncUpdateUser(copyUser.id, copyUser));
  };

  const renderProduct = products?.map((product) => {
    return (
      <div
        key={product.id}
        className="w-[250px] h-[320px]  border-1 p-1 overflow-auto"
      >
        <img
          className="w-[100%] h-[50%] object-cover"
          src={product.image}
          alt=""
        />
        <h1>Title : {product.title}</h1>
        <small>
          Description : {product.description}{" "}
          <Link className="text-[#e18441] text-xl" to={`/product/${product.id}`}>
            ....more
          </Link>
        </small>

        <div className="flex justify-between p-1 mt-3 items-center">
          <p>{product.price}</p>
          <button
            className="bg-blue-800 text-white px-2 py-1"
            onClick={() => AddToCart(product)}
          >
            Add to cart
          </button>
        </div>
      </div>
    );
  });

  return products.length > 0 ? (
    <div className="w-[90%] p-3 flex gap-4 m-auto flex-wrap">{renderProduct}</div>
  ) : (
    "Loading..."
  );
};

export default Products;
