import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { asyncRegisterUser } from "../store/actions/userAction";
import { useDispatch } from "react-redux";

const Signup = () => {
  const { handleSubmit, reset, register } = useForm();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const RegisterSubmit = (user) => {
    user.id = nanoid();
    user.isAdmin = false;
    dispatch(asyncRegisterUser(user));
    reset()
    navigate("/login");
  };

  return (
    <div className="flex p-[2rem] items-center ">
      <form
        className="flex flex-col items-start gap-[1rem]"
        onSubmit={handleSubmit(RegisterSubmit)}
      >
        <input
          className="text-2xl border rounded px-[10px] py-[4px] outline-0"
          {...register("username")}
          // required={true}
          type="text"
          placeholder="Enter username"
        />

        <input
          className="text-2xl border rounded px-[10px] py-[4px] outline-0"
          {...register("email")}
            //  required={true}
          type="email"
          placeholder="Enter email"
        />

        <input
          className="text-2xl border rounded px-[10px] py-[4px] outline-0"
          {...register("password")}
            //  required={true}
          type="password"
          placeholder="Enter password"
        />

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
