import React from "react";
import Videomanagetabs from "../components/video/Videomanagetabs";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const Videoupload = () => {
  return (
    <div>
      <Videomanagetabs />
      <Box pt={4}>
        <Outlet />
      </Box>
    </div>
  );
};

export default Videoupload;
