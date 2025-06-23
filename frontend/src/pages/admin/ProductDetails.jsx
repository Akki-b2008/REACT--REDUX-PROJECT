import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  asyncDeleteProducts,
  asyncUpdateProducts,
} from "../../store/actions/productAction";
import { useEffect } from "react";

const ProductDetails = () => {
  const { id } = useParams();

  const products = useSelector((state) => state.productReducer.products);

  const user = useSelector((state) => state.userReducer.user);

  const product = products?.find((product) => product.id == id);

  const { handleSubmit, reset, register } = useForm();

  useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        image: product.image,
        description: product.description,
        price: product.price,
        category: product.category,
      });
    }
  }, [product, reset]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const UpdateProductSubmit = (data) => {
    data.id = id;
    dispatch(asyncUpdateProducts(data));
  };

  const deleteSubmit = () => {
    dispatch(asyncDeleteProducts(id));
    navigate("/");
  };

  return product ? (
    <>
      <div className="flex  w-[100%]">
        <div className="w-[30%] p-5 ">
          <h1 className="text-[3rem]">{product.title}</h1>
          <img
            className="w-[300px] h-[300px] object-cover"
            src={product.image}
            alt=""
          />
          <h1 className="text-[1.2rem]">{product.description}</h1>
          <div className="flex gap-[8vw]">
            <p>{product.price}</p>
            <p>{product.category}</p>
          </div>
        </div>

        <div className="flex p-[2rem] w-[30%] items-center ">
          {user && user?.isAdmin && (
            <form
              className="flex flex-col items-start gap-[1rem] "
              onSubmit={handleSubmit(UpdateProductSubmit)}
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
                className=" resize-none h-[18vh] text-2xl border rounded px-[10px] py-[4px] outline-0"
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
              <div className="flex gap-5 mt-6">
                <button className="border-0 px-4 py-2 rounded text-xl bg-blue-700 text-white">
                  Update product
                </button>

                <button
                  onClick={deleteSubmit}
                  type="button"
                  className="border-0 px-4 py-2 rounded text-xl bg-red-600 text-white"
                >
                  Delete product
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  ) : (
    "loading..."
  );
};

export default ProductDetails;
