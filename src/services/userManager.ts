import axios from "axios";
import createToast from "./createToast";
import { setUser } from "../redux/reducers/User";
import { AnyAction, Dispatch } from "redux";
import { NavigateFunction } from "react-router-dom";
import { loginpayload } from "../types";
import { setChannel } from "../redux/reducers/Channel";

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
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(setUser(data));
      // createToast("welcome back", "success");
    } else if (token === "undefined") {
      createToast("Please Login", "error");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  } catch (error: any) {
    if (error?.response?.data?.error?.startsWith("Token expired")) {
      localStorage.removeItem("token");
    }
    // createToast(error?.response?.data?.error, "error");
    createToast("Please Login", "error");
    // localStorage.removeItem("token");
    console.error(error);
    const pathname = window.location.pathname;
    if (pathname !== "/googleauth") navigate("/login");
  }
}

export const login = async (
  dispatch: Dispatch<AnyAction>,
  payload: loginpayload
) => {
  try {
    // console.log("payload: ", payload);
    const response = await axios.post("/user/login", payload);
    const data = response.data;
    // console.log("data: ", data);
    console.log("data: ", data);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("channel", JSON.stringify(data.channel));
    dispatch(setUser(data.user));
    dispatch(setChannel(data.channel));
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
