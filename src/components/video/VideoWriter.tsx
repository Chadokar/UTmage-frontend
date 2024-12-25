import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { tilteDescriptionSubmit } from "../../services/manager";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { axiosPostRequest } from "../../services/querycalles";
import createToast from "../../services/createToast";
import { useQueryClient } from "@tanstack/react-query";

const VideoWriter = () => {
  const queryClient = useQueryClient();
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const { video } = useSelector((state: RootState) => state.video.data);

  const [formData, setFormData] = React.useState({
    title: video?.title || "",
    description: video?.description || "",
    content: video?.content || "",
  });

  const user = JSON.parse(localStorage.getItem("user") || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTitleDescSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    tilteDescriptionSubmit({
      title: formData.title,
      description: formData.description,
      id: video?.id,
    }).then((response) => {
      queryClient.invalidateQueries({
        queryKey: ["videos", { id: video?.id }],
      });
    });
  };

  const handleContentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axiosPostRequest(
        `${process.env.REACT_APP_FILE_BACKEND_URL}/video/create`,
        { id: video?.id },
        { content: formData.content, title: formData.title }
      );
      queryClient.invalidateQueries({
        queryKey: ["videos", { id: video?.id }],
      });
      createToast("Content Submitted successfully", "success");
    } catch (error: any) {
      // console.error("Error uploading video: ", error);
    }
  };

  // useEffect(() => {
  //   if (video?.id == id) {
  //     setFormData({
  //       title: video?.title || "",
  //       description: video?.description || "",
  //       content: video?.content || "",
  //     });
  //     localStorage.setItem("calls", "0");
  //   } else {
  //     dispatch(setVideoId(id));
  //     queryClient.invalidateQueries({ queryKey: ["videos", { id }] });
  //     setTimeout(() => {
  //       const calls = localStorage.getItem("calls") || "0";
  //       // calls is a string, so we need to convert it to a number
  //       localStorage.setItem("calls", (parseInt(calls) + 1).toString());
  //       if (calls <= "1" && video?.id != id) {
  //         window.location.reload();
  //       } else {
  //         localStorage.setItem("calls", "0");
  //         navigate("/");
  //       }
  //     }, 1000);
  //   }
  // }, [id]);

  const valid =
    user &&
    (user.role === "writer" ||
      user.role === "admin" ||
      user.role === "manager" ||
      user.role === "owner");

  return (
    <Container>
      {!valid && (
        <p style={{ color: "red" }}>
          *You have to be manager or writer to modify it
        </p>
      )}
      <Box mb={4} component={"form"} onSubmit={handleTitleDescSubmit}>
        <Typography variant="h4" gutterBottom>
          Title and Description
        </Typography>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.title || video?.title}
          name="title"
          onChange={handleChange}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={formData.description || video?.description}
          name="description"
          onChange={handleChange}
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
              disabled={
                formData.description && formData.title && valid ? false : true
              }
              onClick={() => {
                setFormData({
                  ...formData,
                  title: "",
                  description: "",
                });
              }}
              sx={{ marginRight: 1 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={
                formData.description && formData.title && valid ? false : true
              }
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
      <Box mb={4} component={"form"} onSubmit={handleContentSubmit}>
        <Typography variant="h4" gutterBottom>
          Video Content
        </Typography>
        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={10}
          value={formData.content || video?.content}
          name="content"
          onChange={handleChange}
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
              disabled={formData.content && valid ? false : true}
              onClick={() => {
                setFormData({
                  ...formData,
                  content: "",
                });
              }}
              sx={{ marginRight: 1 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={formData.content && valid ? false : true}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default VideoWriter;
