import { Box, Button, Grid, IconButton } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Player } from "video-react";
import { Upload as UploadIcon } from "@mui/icons-material";
import { uploadFileToYT } from "../../services/manager";
const VideoEditor = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoProgress, setVideoProgress] = useState<number>(0);

  const handleVideoChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setVideoFile(event.target.files[0]);
    }
  };

  const handleVideoUpload = () => {
    if (!videoFile) {
      alert("Please select a video file first");
      return;
    }
    uploadFileToYT(videoFile, "/video/upload", setVideoProgress, "video");
  };

  return (
    <div>
      <Grid
        container
        spacing={1}
        mb={3}
        ml={0}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          width={500}
          height={300}
          display="flex"
          justifyContent="center"
          alignItems="center"
          border="2px dashed grey"
          borderRadius={4}
          position="relative"
          mr={2}
          sx={{ ":hover": { backgroundColor: "rgba(0,0,0,0.1)" } }}
        >
          {videoFile ? (
            <Player
              playsInline
              src={URL.createObjectURL(videoFile)}
              width={100}
              height={140}
            />
          ) : (
            <IconButton color="primary" component="label" size="large">
              <UploadIcon fontSize="inherit" />
              <input
                type="file"
                accept="video/*"
                hidden
                onChange={handleVideoChange}
              />
            </IconButton>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Box>
            <Button
              variant="outlined"
              disabled={!videoFile}
              sx={{ marginRight: 1 }}
              onClick={() => setVideoFile(null)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={!videoFile}
              onClick={handleVideoUpload}
            >
              Publish Video
            </Button>
          </Box>
        </Box>
      </Grid>
    </div>
  );
};

export default VideoEditor;
