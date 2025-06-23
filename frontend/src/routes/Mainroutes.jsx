import { Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { useSelector } from "react-redux";

const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const Products = lazy(() => import("../pages/Products"));
const CreateProduct = lazy(() => import("../pages/admin/CreateProduct"));
const ProductDetails = lazy(() => import("../pages/admin/ProductDetails"));
const Cart = lazy(() => import("../pages/Cart"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const UserProfile = lazy(() => import("../pages/user/UserProfile"));
const AuthWrapper = lazy(() => import("./AuthWrapper"));
const UnAuthWrapper = lazy(() => import("./UnAuthWrapper"));


const Mainroutes = () => {
  const user = useSelector((state) => state.userReducer.user);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Products />} />

        <Route
          path="/login"
          element={
            <UnAuthWrapper>
              <Login />
            </UnAuthWrapper>
          }
        />

        <Route
          path="/signup"
          element={
            <UnAuthWrapper>
              <Signup />
            </UnAuthWrapper>
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
