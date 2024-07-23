import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const Videomanagetabs: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };
  console.log("location: ", location.pathname);
  const values = location.pathname.split("/");
  console.log(values);
  let value = "";
  if (values.length > 3) {
    value = values[3];
  }

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", pt: 2 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="customization tabs"
      >
        <Tab label="Home" value="" />
        <Tab label="Editor" value="editor" />
        <Tab label="Writor" value="writor" />
        <Tab label="Designer" value="designer" />
      </Tabs>
    </Box>
  );
};

export default Videomanagetabs;
