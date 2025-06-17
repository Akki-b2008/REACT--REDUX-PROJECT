import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { asyncLogoutUser } from "../store/actions/userAction";

const Nav = () => {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutSubmit = () => {
    dispatch(asyncLogoutUser())
    navigate('/')
    console.log('logout done');
  };

  return (
    <nav className="flex gap-[4rem] justify-center px-[1rem] py-[12px] bg-cyan-500 text-2xl mb-[20px]">
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/products"}>Products</NavLink>
      {user ? (
        <>
          <NavLink to={"/admin/create-product"}>Create Product</NavLink>
          <button onClick={logoutSubmit}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to={"/login"}>Login</NavLink>
        </>
      )}
    </nav>
  );
};

export default Nav;
