import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncCreateProducts } from "../../store/actions/productAction";

const CreateProducts = () => {
  const { handleSubmit, reset, register } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const CreateProductSubmit = (product) => {
    product.id = nanoid();
    dispatch(asyncCreateProducts(product, navigate));
    reset();
    navigate("/products");
  };

  return (
    <div className="flex p-[2rem] items-center ">
      <form
        autoComplete="on"
        className="flex flex-col items-start gap-[1rem] "
        onSubmit={handleSubmit(CreateProductSubmit)}
      >
        <input
          className="text-2xl border rounded px-[10px] py-[4px] outline-0"
          {...register("image")}
          type="url"
          placeholder="img url here"
        />
        <input
          className="text-2xl border rounded px-[10px] py-[4px] outline-0"
          {...register("title")}
          type="text"
          placeholder="Enter title here"
        />

        <textarea
          className="text-2xl border rounded px-[10px] py-[4px] outline-0"
          {...register("description")}
          //  required={true}
          type="text"
          placeholder="Enter description here"
        />
        <div className="flex justify-between gap-[2rem]">
          <input
            className="border-b-1 w-[] py-[4px] outline-0"
            {...register("price")}
            //  required={true}
            type="number"
            placeholder="enter price"
          />

          <input
            className="border-b-1 w-fit text-center py-[4px] outline-0"
            {...register("category")}
            //  required={true}
            type="text"
            placeholder="category"
          />
        </div>

        <button className="border px-[1rem] text-[16px] rounded py-1">
          Create product
        </button>
      </form>
    </div>
  );
};

export default CreateProducts;
