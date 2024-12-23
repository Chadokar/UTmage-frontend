import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React from "react";
import { tilteDescriptionSubmit } from "../../services/manager";

const NewVideoForm: React.FC = () => {
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  // console.log("video form");

  const handleTitDescriptionSubmit = async () => {
    tilteDescriptionSubmit({ title, description });
  };

  return (
    <Container>
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Start Video
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
              Start
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default React.memo(NewVideoForm);
