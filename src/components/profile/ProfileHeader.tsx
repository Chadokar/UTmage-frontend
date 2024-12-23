import React from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Loader from "../Loader";
import { ChannelProps, ProfileProps } from "../../types";
import AlertDialogSlide from "./Dialog";
import { Link } from "react-router-dom";

const ProfileHeader: React.FC = () => {
  const user: ProfileProps = useSelector((state: RootState) => state.user.data);
  const channel: ChannelProps = JSON.parse(
    localStorage.getItem("channel") || ""
  );
  console.log("channel: ", channel);

  if (!user || user === undefined || user === null || !channel) {
    return <Loader />;
  }

  // publishedAt: "2021-11-18T12:21:07.43873Z"
  const date = new Date(user.publishedAt);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar
        sx={{ width: 80, height: 80, mb: 2 }}
        alt={user?.first_name[0] || "Y"}
        src={user?.thumbnail}
      />
      <Typography variant="h4">
        {/* {user.first_name} {user.last_name} */}
        {channel.title}
      </Typography>
      <Typography variant="body1">{channel.url}</Typography>
      <Typography variant="body2" color="text.secondary">
        More about this channel ...{" "}
        <AlertDialogSlide button="more">
          <Box component="div" sx={{ minWidth: "40vw" }}>
            <DialogTitle>About</DialogTitle>
            <DialogContent dividers>
              <DialogContentText>
                {/* <Box sx={{ mb: 2 }}>
              <Typography variant="body1">Phone verified</Typography>
              <Typography variant="body2">{channel.phone_verified}</Typography>
            </Box> */}
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 1,
                  }}
                >
                  <Typography variant="body1">URL : </Typography>
                  <Typography variant="body2">{channel.url}</Typography>
                </Box>
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 1,
                  }}
                >
                  <Typography variant="body1">Subscribers : </Typography>
                  <Typography variant="body2">
                    {channel.subscriberCount} subscribers
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 1,
                  }}
                >
                  <Typography variant="body1">Videos : </Typography>
                  <Typography variant="body2">
                    {channel.videoCount} videos
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 1,
                  }}
                >
                  <Typography variant="body1">Videos : </Typography>
                  <Typography variant="body2">
                    {channel.videoCount} videos
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 1,
                  }}
                >
                  <Typography variant="body1">Views : </Typography>
                  <Typography variant="body2">
                    {channel.viewCount} views
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 1,
                  }}
                >
                  <Typography variant="body1">Joined : </Typography>
                  <Typography variant="body2">{formattedDate}</Typography>
                </Box>
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 1,
                  }}
                >
                  <Typography variant="body1">Description : </Typography>
                  <Typography variant="body2">{channel.description}</Typography>
                </Box>
              </DialogContentText>
            </DialogContent>
          </Box>
        </AlertDialogSlide>
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Link
          to="/customization"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Button variant="contained" color="primary" sx={{ mr: 1 }}>
            Customise channel
          </Button>
        </Link>
        <Link to="/video" style={{ textDecoration: "none", color: "inherit" }}>
          <Button variant="contained" color="primary">
            Manage videos
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default React.memo(ProfileHeader);
