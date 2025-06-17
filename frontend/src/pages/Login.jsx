import React from "react";
import { useForm } from "react-hook-form";
import { Await, Link, useNavigate } from "react-router-dom";
import { asyncLoginUser } from "../store/actions/userAction";
import { useDispatch } from "react-redux";

const Login = () => {
  const {
    handleSubmit, reset, register, formState: { errors } } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSubmit = async (user) => {
    const res = await dispatch(asyncLoginUser(user));
    console.log(res);
    
    reset();
    if (res?.success) {
      navigate("/");
    } else navigate("/signup");
  };

  return (
    <div className="flex p-[2rem]  items-center h-[100%]">
      <form
        className="flex flex-col items-start gap-[1rem]"
        onSubmit={handleSubmit(loginSubmit)}
      >
        <input
          className="text-2xl border rounded px-[10px] py-[4px] outline-0"
          {...register("email", { required: "Email is required" })}
          required={true}
          name="email"
          autoComplete="email"
          type="email"
          placeholder="Enter username or email"
        />

        <input
          className="text-2xl border rounded px-[10px] py-[4px] outline-0"
          {...register("password", { required: true })}
          required={true}
          type="password"
          placeholder="Enter password"
        />

        <button className="border px-[1rem] text-[16px] rounded py-1">
          Login user
        </button>

        <p>
          Don't have an account ?{" "}
          <Link className="text-[#f16f0b]" to={"/signup"}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
