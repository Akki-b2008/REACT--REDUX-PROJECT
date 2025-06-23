import axios from "../../utils/axios";
import { loaduser, removeuser } from "../reducers/userSlice";

export const asyncCurrentUser = () => async (dispatch, getState) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) dispatch(loaduser(user));
  } catch (error) {
    console.log("Failed to load user data!");
  }
};

export const asyncLogoutUser = () => async (dispatch, getState) => {
  try {
    localStorage.removeItem("user");
    dispatch(removeuser());
  } catch (error) {
    console.log(error);
  }
};

export const asyncRegisterUser = (user) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/users", user);
  } catch (error) {
    console.log(error);
  }
};

export const asyncLoginUser = (user) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `/users?email=${user.email}&password=${user.password}`
    );

    if (data[0]) {
      localStorage.setItem("user", JSON.stringify(data[0]));
      dispatch(asyncCurrentUser());
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.log(error);
  }
};

export const asyncUpdateUser = (id, user) => async (dispatch, getState) => {
  try {
    const { data } = await axios.patch("/users/" + id, user);
    
    localStorage.setItem("user", JSON.stringify(data));
    dispatch(asyncCurrentUser());
  } catch (error) {
    console.log(error);
  }
};

export const asyncdeleteuser = (id) => async (dispatch, getState) => {
  try {
    await axios.delete("/users/" + id);
    dispatch(asyncLogoutUser());
  } catch (error) {
    console.log(error);
  }
};
