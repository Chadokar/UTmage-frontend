import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Videomanagetabs: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };
  const user = useSelector((state: RootState) => state.user.data);
  // console.log("location: ", location.pathname);
  const values = location.pathname.split("/");
  // console.log(values);
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
        {user?.role === "owner" && <Tab label="Home" value="" />}
        <Tab label="Editor" value="editor" />
        <Tab label="Writer" value="writer" />
        <Tab label="Designer" value="designer" />
      </Tabs>
    </Box>
  );
};

export default Videomanagetabs;
