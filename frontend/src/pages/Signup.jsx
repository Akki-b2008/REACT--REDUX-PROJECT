import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { asyncRegisterUser } from "../store/actions/userAction";
import { useDispatch } from "react-redux";

const Signup = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const RegisterSubmit = (user) => {
    user.id = nanoid();
    user.cart = [];
    user.isAdmin = false;
    dispatch(asyncRegisterUser(user));
    reset();
    navigate("/login");
  };

  return (
    <div className="flex p-[2rem] items-center ">
      <form
        className="flex flex-col items-start gap-[1rem]"
        onSubmit={handleSubmit(RegisterSubmit)}
      >
        
        <input
          className=" capitalize text-2xl border rounded px-[10px] py-[4px] outline-0"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
          })}
          type="text"
          placeholder="Enter username"
        />

        {errors.username && (
          <p className="text-red-500 -mt-2 text-sm">
            {errors.username.message}
          </p>
        )}

        <input
          className="text-2xl border rounded px-[10px] py-[4px] outline-0"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email address",
            },
          })}
          placeholder="Enter email"
        />

        {errors.email && (
          <p className="text-red-500 -mt-2 text-sm">{errors.email.message}</p>
        )}

        <input
          className="text-2xl border rounded px-[10px] py-[4px] outline-0"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          placeholder="Enter password"
        />

        {errors.password && (
          <p className="text-red-500 -mt-2 text-sm">
            {errors.password.message}
          </p>
        )}

        <button className="border px-[1rem] text-[16px] rounded py-1">
          Register user
        </button>

        <p>
          already have an account ?{" "}
          <Link className="text-[#f16f0b]" to={"/login"}>
            log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
