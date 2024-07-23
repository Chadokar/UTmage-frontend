import React from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { ChannelProps } from "../../types";
import { axiosPutRequest } from "../../services/querycalles";

const BasicCustomization = () => {
  const channel: ChannelProps = JSON.parse(
    localStorage.getItem("channel") || ""
  );
  const [data, setData] = React.useState({
    title: channel.title,
    description: channel.description,
    url: channel.url,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosPutRequest("/channel", {}, data);
      console.log("response : ", response);
    } catch (error) {
      console.error("error : ", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Channel customisation
      </Typography>
      <Typography variant="h6" gutterBottom>
        Basic info
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="title"
          // defaultValue="lucky's_4s"
          placeholder="Name"
          value={data.title}
          onChange={handleChange}
          helperText="Choose a channel name that represents you and your content. Changes made to your name and picture are only visible on YouTube and not on other Google services. You can change your name twice in 14 days."
          margin="normal"
          // disabled
        />

        <TextField
          fullWidth
          label="Handle"
          name="url"
          value={data.url}
          // onChange={handleChange}
          helperText="Choose your unique handle by adding letters and numbers. You can change your handle back within 14 days. Handles can be changed twice every 14 days."
          margin="normal"
          // disabled
        />

        <TextField
          fullWidth
          label="Description"
          multiline
          name="description"
          value={data.description}
          onChange={handleChange}
          rows={4}
          placeholder="Tell viewers about your channel. Your description will appear in the About section of your channel and search results, among other places."
          margin="normal"
        />

        <Typography
          component="a"
          href="https://www.youtube.com/@luckys_4s445"
          target="_blank"
          rel="noreferrer"
          style={{ color: "inherit" }}
          variant="body1"
          gutterBottom
        >
          https://www.youtube.com/@luckys_4s445
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Button variant="outlined">View channel</Button>
          <Box>
            <Button variant="outlined" sx={{ marginRight: 1 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Publish
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default BasicCustomization;
