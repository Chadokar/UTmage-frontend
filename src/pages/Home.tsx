import React from "react";
import { Box, Grid, Typography, Paper, Avatar } from "@mui/material";
import AddMember from "../components/AddMember";
import { RoleCardProps } from "../types";

const RoleCard: React.FC<RoleCardProps> = ({
  title,
  description,
  imageSrc,
}) => (
  <Grid item xs={12} md={6}>
    <Paper elevation={3} sx={{ p: 3, display: "flex", alignItems: "center" }}>
      <Avatar src={imageSrc} sx={{ width: 56, height: 56, mr: 2 }} />
      <Box>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>
    </Paper>
  </Grid>
);

const DashboardContent: React.FC = () => {
  const channel = localStorage.getItem("channel");
  const user = localStorage.getItem("user");

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the YouTube Team Collaboration Platform
      </Typography>
      <Typography variant="body1" gutterBottom>
        This platform empowers your team to collaborate seamlessly and
        efficiently on video production tasks. Below you will find a summary of
        the roles and their respective responsibilities:
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <RoleCard
          title="Video Editor"
          description="The video editor is responsible for editing raw footage, applying effects, and ensuring the final video meets quality standards. Edited videos are uploaded here for review."
          imageSrc="/path/to/video-editor-image.jpg" // Replace with actual image path
        />
        <RoleCard
          title="Designer"
          description="The designer creates visually appealing thumbnails and other graphic elements required for video production. Their work enhances the video's attractiveness and click-through rate."
          imageSrc="/path/to/designer-image.jpg" // Replace with actual image path
        />
        <RoleCard
          title="Content Writer"
          description="The content writer crafts compelling descriptions and titles for each video. They ensure that the content is engaging and optimized for search engines, contributing to higher visibility and audience retention."
          imageSrc="/path/to/content-writer-image.jpg" // Replace with actual image path
        />
        <RoleCard
          title="Manager"
          description="The manager oversees the entire production process, ensuring all tasks are completed on time. They review the final video and accompanying materials before publishing them to the YouTube account."
          imageSrc="/path/to/manager-image.jpg" // Replace with actual image path
        />
      </Grid>
      {user && channel && (
        <Box
          mt={4}
          display="flex"
          justifyContent="center"
          component="div"
          width="100%"
        >
          <AddMember />
        </Box>
      )}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Workflow Overview
        </Typography>
        <Typography variant="body1">
          Our platform streamlines the video production workflow, ensuring a
          smooth transition from initial editing to final publishing. Each team
          member's contributions are clearly defined and accessible,
          facilitating efficient collaboration and high-quality output.
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Quality Assurance and Publishing
        </Typography>
        <Typography variant="body1">
          Before any video is published, it undergoes a thorough review process
          by the manager or YouTuber. This final check guarantees that all
          elements, from the video content to the title and thumbnail, are
          polished and ready for the audience.
        </Typography>
      </Box>
    </Box>
  );
};

export default DashboardContent;
