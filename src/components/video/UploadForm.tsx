import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Container,
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import { Upload as UploadIcon } from "@mui/icons-material";
import { Player } from "video-react";
import "video-react/dist/video-react.css"; // import css
// import axios, { AxiosProgressEvent } from "axios";
import { tilteDescriptionSubmit, uploadFileToYT } from "../../services/manager";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useQueryClient } from "@tanstack/react-query";
import { axiosDelete } from "../../services/querycalles";
import createToast from "../../services/createToast";

interface UploadFormProps {
  isModel?: boolean;
}

const UploadForm: React.FC<UploadFormProps> = ({ isModel = false }) => {
  const queryClient = useQueryClient();

  const { video } = useSelector((state: RootState) => state.video.data);

  const navigate = useNavigate();

  const [videoFile, setVideoFile] = useState<File | null | string>(
    typeof video?.backend_name === "string" ? video?.backend_name : null
  );
  const [thumbnailFile, setThumbnailFile] = useState<File | string | null>(
    null
  );
  const [title, setTitle] = useState<string>(video?.title || "");
  const [description, setDescription] = useState<string>(
    video?.description || ""
  );
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [thumbnailProgress, setThumbnailProgress] = useState<number>(0);

  const handleVideoChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setVideoFile(event.target.files[0]);
    }
  };

  const handleThumbnailChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setThumbnailFile(event.target.files[0]);
    }
  };

  const handleTitDescriptionSubmit = async () => {
    tilteDescriptionSubmit({
      id: video?.id,
      title,
      description,
    }).then((response) => {
      queryClient.invalidateQueries({
        queryKey: ["videos", { id: video?.id }],
      });
    });
  };

  const handleVideoUpload = () => {
    if (!videoFile) {
      alert("Please select a video file first");
      return;
    }
    uploadFileToYT(
      videoFile,
      `${process.env.REACT_APP_FILE_BACKEND_URL}/video/bucket/upload`,
      setVideoProgress,
      "video",
      { videoId: video?.id }
    ).then(() => {
      queryClient.invalidateQueries({
        queryKey: ["videos", { id: video?.id }],
      });
    });
  };

  const handleDelete = () => {
    axiosDelete(`/admin/video/delete?id=${video?.id}`)
      .then(() => {
        // navigate("/profile");
        // navigate to profile using window.location
        window.location.href = "/profile";
      })
      .catch((error) => {
        createToast("Error deleting video ", "error");
        console.log("Error deleting video: ", error);
      });
  };

  return (
    <Container>
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Upload Video
        </Typography>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
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
              disabled={description && title ? false : true}
              onClick={() => {
                setDescription("");
                setTitle("");
              }}
              sx={{ marginRight: 1 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={description && title ? false : true}
              onClick={handleTitDescriptionSubmit}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
      <Grid
        container
        spacing={2}
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
              src={
                typeof videoFile === "string"
                  ? `${process.env.REACT_APP_FILE_BACKEND_URL}/uploads/${videoFile}`
                  : URL.createObjectURL(videoFile)
              }
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

      {/* )} */}

      {/* {!isModel && ( */}
      <Grid
        container
        spacing={2}
        my={3}
        ml={0}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* <Box
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
          {thumbnailFile ? (
            <img
              src={
                // check is thumbnail is a file or a string
                typeof thumbnailFile === "string"
                  ? `http://localhost:8001/uploads/${thumbnailFile}`
                  : URL.createObjectURL(thumbnailFile)
              }
              alt="Thumbnail"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <IconButton color="primary" component="label" size="large">
              <UploadIcon fontSize="inherit" />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleThumbnailChange}
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
              disabled={!thumbnailFile}
              sx={{ marginRight: 1 }}
              onClick={() => setThumbnailFile(null)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={!thumbnailFile}
              onClick={handleThumbnailUpload}
            >
              Publish Thumbnail
            </Button>
          </Box>
        </Box> */}
      </Grid>
      {/* )} */}
      {/* Delete Video button */}
      <Button
        variant="contained"
        color="error"
        onClick={handleDelete}
        sx={{ marginTop: 2, mb: 2 }}
      >
        Delete Video
      </Button>
    </Container>
  );
};

export default React.memo(UploadForm);
