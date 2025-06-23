import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Products from "../pages/Products";
import CreateProduct from "../pages/admin/CreateProduct";
import ProductDetails from "../pages/admin/ProductDetails";
import Cart from "../pages/Cart";
import PageNotFound from "../pages/PageNotFound";
import UserProfile from "../pages/user/UserProfile";
import AuthWrapper from "./AuthWrapper";
import { useSelector } from "react-redux";
import PublicOnlyWrapper from "./PublicOnlyWrapper";

const Mainroutes = () => {
  const user = useSelector((state) => state.userReducer.user);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Products />} />

        <Route
          path="/login"
          element={
            <PublicOnlyWrapper>
              <Login />
            </PublicOnlyWrapper>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicOnlyWrapper>
              <Signup />
            </PublicOnlyWrapper>
          }
        />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route
          path="/cart"
          element={
            <AuthWrapper>
              <Cart />
            </AuthWrapper>
          }
        />

        {user?.isAdmin && (
          <Route
            path="/admin/create-product"
            element={
              <AuthWrapper>
                <CreateProduct />
              </AuthWrapper>
            }
          />
        )}

        <Route
          path="/user-profile"
          element={
            <AuthWrapper>
              <UserProfile />
            </AuthWrapper>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default Mainroutes;
