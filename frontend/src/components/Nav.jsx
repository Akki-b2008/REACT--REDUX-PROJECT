import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Nav = () => {
  const user = useSelector((state) => state.userReducer.user);

  return (
    <nav className="flex gap-[4rem] justify-center px-[1rem] py-[12px] bg-cyan-500 text-2xl mb-[20px]">
      <NavLink to={"/"}>Home</NavLink>

      {user ? (
        <>
          {user && user?.isAdmin && (
            <NavLink to="/admin/create-product">Create Product</NavLink>
          )}
          <NavLink to={"/cart"}>Cart</NavLink>
          <NavLink to="/user-profile">Settings</NavLink>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
        </>
      )}
    </nav>
  );
};

export default Nav;
