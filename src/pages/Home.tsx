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
          description="The video editor can access the design and raw video file, then upload the final video to the platform."
          imageSrc="/path/to/video-editor-image.jpg" // Replace with actual image path
        />
        <RoleCard
          title="Designer"
          description="The designer can watch the video, upload the thumbnail, and other design elements to the platform."
          imageSrc="/path/to/designer-image.jpg" // Replace with actual image path
        />
        <RoleCard
          title="Content Writer"
          description="The content writer watch the video, write the title, description, and tags, then upload the script to the platform."
          imageSrc="/path/to/content-writer-image.jpg" // Replace with actual image path
        />
        <RoleCard
          title="Manager"
          description="The manager oversees the entire production process, ensuring all tasks are completed on time."
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
