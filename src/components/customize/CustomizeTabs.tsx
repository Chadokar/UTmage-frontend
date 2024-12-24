import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const CustomizeTabs: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", pt: 2 }}>
      <Tabs
        value={location.pathname}
        onChange={handleChange}
        aria-label="customization tabs"
      >
        <Tab label="Basic info" value="/customization" />
        <Tab label="Branding" value="/customization/branding" />
        {/* <Tab label="Layout" value="/customization/layout" /> */}
      </Tabs>
    </Box>
  );
};

export default CustomizeTabs;
