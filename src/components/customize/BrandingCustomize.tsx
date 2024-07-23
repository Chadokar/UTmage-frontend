import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";

const BrandingTab = () => {
  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Channel customisation
      </Typography>
      <Typography variant="h6" gutterBottom>
        Branding
      </Typography>

      <Card sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Picture
          </Typography>
          <CardMedia
            component="img"
            image="https://via.placeholder.com/98"
            alt="Profile"
            sx={{ width: 98, height: 98, marginBottom: 2 }}
          />
          <Typography variant="body2" gutterBottom>
            Your profile picture will appear where your channel is presented on
            YouTube, such as next to your videos and comments. It's recommended
            that you use a picture that's at least 98 x 98 pixels and 4 MB or
            less. Use a PNG or GIF (no animations) file. Make sure that your
            picture follows the YouTube Community Guidelines.
          </Typography>
          <Button variant="contained">Upload</Button>
        </CardContent>
      </Card>

      <Card sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Banner image
          </Typography>
          <CardMedia
            component="img"
            image="https://via.placeholder.com/2048x1152"
            alt="Banner"
            sx={{ width: "100%", height: 200, marginBottom: 2 }}
          />
          <Typography variant="body2" gutterBottom>
            This image will appear across the top of your channel. For the best
            results on all devices, use an image that's at least 2048 x 1152
            pixels and 6 MB or less.
          </Typography>
          <Button variant="contained">Upload</Button>
        </CardContent>
      </Card>

      <Card sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Video watermark
          </Typography>
          <CardMedia
            component="img"
            image="https://via.placeholder.com/150"
            alt="Watermark"
            sx={{ width: 150, height: 150, marginBottom: 2 }}
          />
          <Typography variant="body2" gutterBottom>
            The watermark will appear on your videos in the right-hand corner of
            the video player.
          </Typography>
          <Button variant="contained">Upload</Button>
        </CardContent>
      </Card>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}
      >
        <Button variant="outlined">View channel</Button>
        <Box>
          <Button variant="outlined" sx={{ marginRight: 1 }}>
            Cancel
          </Button>
          <Button variant="contained">Publish</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BrandingTab;
