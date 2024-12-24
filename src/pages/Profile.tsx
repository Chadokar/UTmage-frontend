// import React from "react";
// import { Box, Avatar, Typography, Link } from "@mui/material";
// import EmailIcon from "@mui/icons-material/Email";
// import YouTubeIcon from "@mui/icons-material/YouTube";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { ProfileProps } from "../types";

// const Profile: React.FC = () => {
//   const user: ProfileProps = JSON.parse(localStorage.getItem("user") || "");
//   return (
//     <Box
//       display="flex"
//       flexDirection="column"
//       alignItems="center"
//       p={2}
//       sx={{
//         maxWidth: 400,
//         margin: "0 auto",
//         boxShadow: 3,
//         borderRadius: 2,
//         backgroundColor: "background.paper",
//       }}
//     >
//       <Avatar
//         alt="User Image"
//         src={user?.imageUrl}
//         sx={{ width: 100, height: 100, mb: 2 }}
//       />
//       <Box display="flex" alignItems="center" mb={1}>
//         <AccountCircleIcon sx={{ mr: 1 }} />
//         <Typography variant="h5" gutterBottom>
//           {user.first_name} {user.last_name}
//         </Typography>
//       </Box>
//       <Box display="flex" alignItems="center" mb={1}>
//         <EmailIcon sx={{ mr: 1 }} />
//         <Typography variant="body1">{user.email}</Typography>
//       </Box>
//       <Box display="flex" alignItems="center">
//         <YouTubeIcon sx={{ mr: 1 }} />
//         <Link href={`https://www.youtube.com/channel/${user.yt_channel}`}>
//           <Typography variant="body1" color="primary">
//             YouTube Channel
//           </Typography>
//         </Link>
//       </Box>
//     </Box>
//   );
// };

// export default Profile;

// pages/Profile.tsx
import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileTabs from "../components/profile/ProfileTabs";
// c
const ProfilePage: React.FC = () => {
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
      <ProfileHeader />
      <ProfileTabs />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default ProfilePage;
