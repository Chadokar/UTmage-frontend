// import React, { useState, ChangeEvent } from "react";
// import axios, { AxiosProgressEvent } from "axios";

// const VideoUpload: React.FC = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [uploadProgress, setUploadProgress] = useState<number>(0);

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       setSelectedFile(event.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert("Please select a file first");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("video", selectedFile);

//     try {
//       const response = await axios.post("/video/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         onUploadProgress: (progressEvent: AxiosProgressEvent) => {
//           if (progressEvent.total) {
//             const percentCompleted = Math.round(
//               (progressEvent.loaded * 100) / progressEvent.total
//             );
//             setUploadProgress(percentCompleted);
//           }
//         },
//       });

//       console.log("Video uploaded successfully:", response.data);
//     } catch (error) {
//       console.error("Error uploading video:", error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload Video</button>
//       {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
//     </div>
//   );
// };

// export default VideoUpload;

import React, { useState, ChangeEvent } from "react";
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
import axios, { AxiosProgressEvent } from "axios";
import { uploadFileToYT } from "../../services/manager";

interface UploadFormProps {
  isModel?: boolean;
}

const UploadForm: React.FC<UploadFormProps> = ({ isModel = false }) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
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

  const handleTitDescriptionSubmit = () => {
    if (title && description) {
      console.log("Title:", title);
      console.log("Description:", description);
    }
  };

  const handleVideoUpload = () => {
    if (!videoFile) {
      alert("Please select a video file first");
      return;
    }
    uploadFileToYT(videoFile, "/video/upload", setVideoProgress, "video");
  };

  const handleThumbnailUpload = () => {
    if (!thumbnailFile) {
      alert("Please select a thumbnail file first");
      return;
    }
    uploadFileToYT(
      thumbnailFile,
      "/video/thumbnail",
      setThumbnailProgress,
      "file"
    );
  };

  return (
    <Container>
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          {isModel ? "Start" : "Upload"} Video
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
              {isModel ? "Start" : "Publish"}
            </Button>
          </Box>
        </Box>
      </Box>

      {!isModel && (
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
      )}

      {!isModel && (
        <Grid
          container
          spacing={2}
          my={3}
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
            {thumbnailFile ? (
              <img
                src={URL.createObjectURL(thumbnailFile)}
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
          </Box>
        </Grid>
      )}
    </Container>
  );
};

export default UploadForm;
