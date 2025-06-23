import { useDispatch, useSelector } from "react-redux";
import {
  asyncdeleteuser,
  asyncLogoutUser,
  asyncUpdateUser,
} from "../../store/actions/userAction";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserProfile = () => {
  const { user } = useSelector((state) => state.userReducer);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: user.email,
        password: user.password,
      });
    }
  }, [user, reset]);

  const dispatch = useDispatch();

  const UpdateUserHandler = (data) => {
    dispatch(asyncUpdateUser(user.id, data ));
    navigate("/");
  };

  const logoutHandler = () => {
    dispatch(asyncLogoutUser());
    navigate("/login");
  };

  const deleteUserHandler = () => {
    dispatch(asyncdeleteuser(user.id));
    navigate("/login");
  };

  return user ? (
    <div className="p-4">
      <div>
        <h1>Username : {user.username}</h1>
        <h1>Email : {user.email}</h1>
      </div>
      <hr className="my-5" />
      <form
        className="flex flex-col items-start gap-[1rem] "
        onSubmit={handleSubmit(UpdateUserHandler)}
      >
        <input
          className="text-2xl border-b px-[10px] py-[4px] outline-0"
          {...register("username")}
          type="text"
          placeholder="username here"
        />
        <input
           className="text-2xl border-b px-[10px] py-[4px] outline-0"
          {...register("email")}
          type="email"
          placeholder="Email here"
        />
        <input
           className="text-2xl border-b px-[10px] py-[4px] outline-0"
          {...register("password")}
          type="password"
          placeholder="*******"
        />

        <div className="flex gap-5 mt-6">
          <button className="border-0 px-4 py-2 rounded text-xl bg-blue-700 text-white">
            Update user
          </button>

          <button
            onClick={logoutHandler}
            type="button"
            className="border-0 px-4 py-2 rounded text-xl bg-red-500 text-white"
          >
            logout user
          </button>

          <button
            onClick={deleteUserHandler}
            type="button"
            className="border-0 px-4 py-2 rounded text-xl bg-red-800 text-white"
          >
            Delete user
          </button>
        </div>
      </form>
    </div>
  ) : (
    "Loading..."
  );
};

export default UserProfile;
