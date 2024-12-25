// Loader.tsx
import React from "react";
import { Backdrop, CircularProgress, Typography, Box } from "@mui/material";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { axiosGet } from "../services/querycalles";
import { GoogleAuth } from "../types";
import { useDispatch } from "react-redux";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { setUser } from "../redux/reducers/User";
import { setChannel } from "../redux/reducers/Channel";
import { Navigate, useLocation } from "react-router-dom";
import createToast from "../services/createToast";
import Loader from "../components/Loader";

const AuthMediator: React.FC = () => {
  // get "code" from URL which is provided as a query parameter
  const code = new URLSearchParams(window.location.search).get("code");
  // console.log("code: ", code);
  const dispatch = useDispatch<Dispatch<AnyAction>>();
  const location = useLocation();

  const {
    isLoading,
    data,
    error,
    isSuccess,
  }: UseQueryResult<GoogleAuth, Error> = useQuery({
    queryKey: ["data"],
    queryFn: async (): Promise<GoogleAuth> => {
      try {
        const response = await axiosGet<GoogleAuth>(
          "/googleauth/google/decode",
          { code }
        );
        const data = response.data;
        if (!data.success) {
          // localStorage.removeItem("token");
          // localStorage.removeItem("channel");
          // localStorage.removeItem("user");
          createToast(
            data.error?.message || data.error?.detail || data.error,
            "error"
          );
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("channel");
          localStorage.removeItem("user");
          localStorage.setItem("token", data.token);
          localStorage.setItem("channel", JSON.stringify(data.channel));
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch(setUser(data.user));
          dispatch(setChannel(data.channel));
        }
        return data;
      } catch (error: any) {
        return error;
      }
    },
  });
  // console.log("data: ", data);
  if (isLoading) {
    return <Loader />;
  } else if (error) {
    return (
      <Box>
        <Typography variant="h6" color="error">
          {JSON.stringify(error.message)}
        </Typography>
      </Box>
    );
  } else if (isSuccess) {
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }
  return <h1>AuthMediator</h1>;
};

export default AuthMediator;
