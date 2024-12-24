import React from "react";
import Videomanagetabs from "../components/video/Videomanagetabs";
import { Box } from "@mui/material";
import { Outlet, useParams } from "react-router-dom";
import useVideo from "../customHooks/useVideo";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { setVideo } from "../redux/reducers/Video";

const Videoupload = () => {
  const dispatch = useDispatch();
  const id = useParams<{ videoId: string }>().videoId;
  // convert id to number
  const { isLoading, video, error } = useVideo(Number(id), dispatch);
  console.log("video: ", video);

  return (
    <div>
      <Videomanagetabs />
      <Box pt={4}>{isLoading ? <Loader /> : video && <Outlet />}</Box>
      {error && <Box>Error loading video</Box>}
    </div>
  );
};

export default Videoupload;
