import axios from "axios";
import createToast from "./createToast";
import { setUser } from "../redux/reducers/User";
import { AnyAction, Dispatch } from "redux";
import { NavigateFunction } from "react-router-dom";
import { loginpayload } from "../types";

export async function fetchUserData(
  dispatch: Dispatch<AnyAction>,
  navigate: NavigateFunction
): Promise<void> {
  try {
    const token = localStorage.getItem("token");
    if (token && token !== "undefined") {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`/user/profile`, config);
      const data = response.data.user;
      dispatch(setUser(data));
    }
  } catch (error: any) {
    if (error?.response?.data?.error?.startsWith("Token expired")) {
      localStorage.removeItem("token");
    }
    createToast(error?.response?.data?.error, "error");
    createToast("Please Re-Login", "error");
    // localStorage.removeItem("token");
    console.error(error);
    navigate("/login");
  }
}

export const login = async (
  dispatch: Dispatch<AnyAction>,
  payload: loginpayload
) => {
  try {
    // console.log("payload: ", payload);
    const response = await axios.post("/user/login", payload);
    const data = response.data.data;
    // console.log("data: ", data);
    dispatch(setUser(data.user));
    localStorage.setItem("token", response.data.data.token);
    createToast("Logged in successfully", "success");
    return response;
  } catch (error: any) {
    if (error?.response?.data?.error?.startsWith("Token expired"))
      localStorage.removeItem("token");
    createToast(error?.response?.data?.error, "error");
    console.log(error);
    return error;
  }
};
