import React from "react";
import {
  Grid,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Dialog,
  DialogContent,
  Button,
} from "@mui/material";
// import { videoData } from "../components/utils/SampleData";
import ImageComponent from "../components/ImageComponent";
import usePlaylist from "../customHooks/usePlaylist";
import Loader from "../components/Loader";
import { ImageData, Video } from "../types";

const VideoGrid = () => {
  const { playlist, loading, error } = usePlaylist();
  const [focusedImage, setFocusedImage] = React.useState<Video | null>(null);

  if (loading) return <Loader />;

  const handleCardClick = (image: Video) => {
    setFocusedImage(image);
  };

  const handleClose = () => {
    setFocusedImage(null);
  };

  return (
    // <Box sx={{ flexGrow: 1, p: 2 }}>
    //   <Grid container spacing={2}>
    //     {playlist?.map((video) => (
    //       <ImageComponent key={video.id} video={video} />
    //     ))}
    //   </Grid>
    // </Box>
    <Box sx={{ flexGrow: 1, p: 2, position: "relative" }}>
      <Grid container spacing={2}>
        {playlist?.map((video) => (
          <Grid
            onClick={() => handleCardClick(video)}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={video.id}
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
          </Grid>
        ))}
      </Grid>

      {focusedImage && (
        <Dialog open={true} onClose={handleClose}>
          <DialogContent>
            <img
              src={focusedImage.imageUrl}
              alt={focusedImage.title}
              style={{ width: "100%", height: "auto" }}
            />
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default VideoGrid;
