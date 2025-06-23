import axios from "../../utils/axios";
import { loadproduct } from "../reducers/productSlice";
import { toast } from "react-toastify";

export const asyncloadProducts = (product) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/products");
    dispatch(loadproduct(data));
  } catch (error) {
    console.log(error);
  }
};

export const asyncCreateProducts = (product,navigate) => async (dispatch) => {
  try {
    await axios.post("/products", product);
    dispatch(asyncloadProducts());
  } catch (error) {
    console.log(error);
  }
};

export const asyncUpdateProducts = (product) => async (dispatch) => {
  try {
    await axios.patch("/products/" + product.id, product);
    dispatch(asyncloadProducts());
  } catch (error) {
    console.log(error);
  }
};

export const asyncDeleteProducts = (id) => async (dispatch) => {
  try {
    await axios.delete("/products/" + id);
    dispatch(asyncloadProducts());
  } catch (error) {
    console.log(error);
  }
};
