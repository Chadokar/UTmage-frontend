import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const ProfileTabs: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={location.pathname}
        onChange={handleChange}
        aria-label="profile tabs"
      >
        <Tab label="Home" value="/profile" />
        <Tab label="Playlists" value="/profile/playlists" />
        <Tab label="Community" value="/profile/community" />
      </Tabs>
    </Box>
  );
};

export default ProfileTabs;
