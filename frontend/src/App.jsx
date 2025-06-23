import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Mainroutes from "./routes/Mainroutes";
import Nav from "./components/Nav";
import { asyncCurrentUser } from "./store/actions/userAction";
import { asyncloadProducts } from "./store/actions/productAction";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const products = useSelector((state) => state.productReducer.products);

  useEffect(() => {
    !user && dispatch(asyncCurrentUser());
  }, [user]);

  useEffect(() => {
    products.length == 0 && dispatch(asyncloadProducts());
  }, [products]);

  return (
    <div className="h-[100%] w-[100%]">
      <Nav />
      <Mainroutes />
    </div>
  );
};

export default App;
