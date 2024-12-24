import { Box, Button, Container, Grid, IconButton } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { Player } from "video-react";
import { Upload as UploadIcon } from "@mui/icons-material";
import { uploadFileToYT } from "../../services/manager";
// import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useQueryClient } from "@tanstack/react-query";
// import { setVideoId } from "../../redux/reducers/VideoId";
// import CustomVideoPlayer from "./CustomVideoPlayer";
// import { setVideoId } from "../../redux/reducers/VideoId";
// import { useQueryClient } from "@tanstack/react-query";
import { RootState } from "../../redux/store";
const VideoEditor = () => {
  const { video } = useSelector((state: RootState) => state.video.data);

  const [videoFile, setVideoFile] = useState<File | null | string>(
    typeof video?.backend_name === "string" ? video?.backend_name : null
  );
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const user = useSelector((state: RootState) => state.user.data);

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
    uploadFileToYT(
      videoFile,
      "http://localhost:8001/video/bucket/upload",
      setVideoProgress,
      "video",
      { videoId: video?.id }
    );
  };

  const valid =
    user &&
    (user.role === "editor" ||
      user.role === "admin" ||
      user.role === "manager" ||
      user.role === "owner");

  return (
    <Container>
      {!valid && (
        <p style={{ color: "red" }}>
          *You have to be manager or Editor to modify it
        </p>
      )}
      {/* {video ? (
        <CustomVideoPlayer id={video?.id} />
      ) : ( */}
      <Grid
        container
        spacing={2}
        p={2}
        mb={3}
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          border="2px dashed grey"
          borderRadius={4}
          padding={2}
          position="relative"
          mr={2}
          sx={{ ":hover": { backgroundColor: "rgba(0,0,0,0.7)" } }}
        >
          {videoFile ? (
            <Player
              playsInline
              src={
                typeof videoFile === "string"
                  ? `http://localhost:8001/uploads/${videoFile}`
                  : URL.createObjectURL(videoFile)
              }
              width={100}
              height={140}
            />
          ) : (
            <IconButton color="primary" component="label" size="large">
              <UploadIcon fontSize="inherit" />
              {valid && (
                <input
                  type="file"
                  accept="video/*"
                  hidden
                  onChange={handleVideoChange}
                />
              )}
            </IconButton>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 2,
            width: "100%",
          }}
          component={"div"}
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
              Upload Video
            </Button>
          </Box>
        </Box>
      </Grid>
      {/* )} */}
    </Container>
  );
};

export default VideoEditor;
