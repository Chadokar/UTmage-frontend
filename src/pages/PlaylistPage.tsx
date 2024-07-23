import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { videoData } from "../components/utils/SampleData";

const VideoGrid = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        {videoData.map((video) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={video.id}>
            <Link
              to={`/video/${video.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card>
                <CardMedia
                  component="img"
                  alt={video.title}
                  height="140"
                  image={video.imageUrl}
                />
                <CardContent>
                  <Typography variant="subtitle2" component="div">
                    {video.title}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VideoGrid;
