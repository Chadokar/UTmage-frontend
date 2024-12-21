import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Video } from "../types";

const ImageComponent: React.FC<{ video: Video }> = ({ video }) => {
  return (
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
            image={video.imageUrl || "https://via.placeholder.com/2000"}
          />
          <CardContent>
            <Typography variant="subtitle2" component="div">
              {video.title}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

export default ImageComponent;
