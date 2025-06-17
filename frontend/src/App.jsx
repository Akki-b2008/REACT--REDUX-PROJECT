import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Mainroutes from "./routes/Mainroutes";
import Nav from "./components/Nav";
import { ToastContainer } from "react-toastify";
import { asyncCurrentUser } from "./store/actions/userAction";
import { asyncloadProducts } from "./store/actions/productAction";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncCurrentUser());
    dispatch(asyncloadProducts());
  }, []);

  return (
    <div className="h-[100%] w-[100%]">
      <Nav />
      <Mainroutes />
      <ToastContainer />
    </div>
  );
};

export default App;
