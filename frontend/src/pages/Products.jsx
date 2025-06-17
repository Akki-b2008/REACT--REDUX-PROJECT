import React from "react";
// import {} from '../store/actions/productAction'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {
  const products = useSelector((state) => state.productReducer.products);

  const cartSubmitHandler = () =>{
    const navigate = useNavigate()
    navigate('/cart')
  }

  const renderProduct = products?.map((product) => {
    return (
      <div key={product.id} className="w-[20%] border-1 p-1 overflow-auto">

        <img className="w-[100%] h-[50%] object-cover" src={product.image} alt="" />
        <h1>Title : {product.title}</h1>
        <small>
          Description : {product.description}{" "}
          <Link className="text-[#e18441]" to={`/product/${product.id}`}>
            ....more
          </Link>
        </small>

        <div className="flex justify-between p-1 mt-3 items-center">
          <p>{product.price}</p>
          <Link to={'/cart'}>
            Add to cart
          </Link>
        </div>
      </div>
    );
  });

  return products.length > 0 ? (
    <div className="flex gap-4 ">{renderProduct}</div>
  ) : (
    "Loading..."
  );
};

export default Products;
