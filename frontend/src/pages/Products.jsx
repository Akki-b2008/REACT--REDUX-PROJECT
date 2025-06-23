import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { asyncUpdateUser } from "../store/actions/userAction";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "../utils/axios";

const Products = () => {
  const user = useSelector((state) => state.userReducer.user);
  // const products = useSelector((state) => state.productReducer.products);

  const [products, setproducts] = useState([]);
  const [hasMore, sethasMore] = useState(true);

  const fetchproducts = async () => {
    try {
      const { data } = await axios.get(
        `/products?_limit=6&_start=${products.length}`
      );
      if (data.length === 0) sethasMore(false);
      else setproducts((products) => [...products, ...data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchproducts();
  }, []);

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
          <Link
            className="text-[#e18441] text-xl"
            to={`/product/${product.id}`}
          >
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

  return (
    <InfiniteScroll
      next={fetchproducts}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      dataLength={products.length}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className="w-[90%] p-3 flex gap-4 m-auto flex-wrap">
        <Suspense
          fallback={
            <h1 className="text-center text-5xl text-yellow-200">Loading...</h1>
          }
        >
          {renderProduct}
        </Suspense>
      </div>
    </InfiniteScroll>
  );
};

export default Products;
