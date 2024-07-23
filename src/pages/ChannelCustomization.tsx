import React from "react";
import { Box } from "@mui/material";
import CustomizeTabs from "../components/customize/CustomizeTabs";
import { Outlet } from "react-router-dom";

const ChannelCustomization = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <CustomizeTabs />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default ChannelCustomization;
