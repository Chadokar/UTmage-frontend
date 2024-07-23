import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { videoData } from "../components/utils/SampleData";
import { Link } from "react-router-dom";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AlertDialogSlide from "../components/profile/Dialog";
import UploadForm from "../components/video/UploadForm";

const HereButton = () => {
  const theme: Theme = useTheme();
  return (
    <Tooltip title="Start new video">
      <IconButton
        color="inherit"
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          ml: 2,
          position: "absolute",
          right: ".625rem",
        }}
      >
        <AddRoundedIcon />
      </IconButton>
    </Tooltip>
  );
};

const ProfileHome = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 2, mr: 8 }}>
      <AlertDialogSlide button={<HereButton />}>
        <Box p={4}>
          <UploadForm isModel={true} />
        </Box>
      </AlertDialogSlide>
      <Grid container spacing={2}>
        {videoData.map((video) => (
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
                  image={video.imageUrl}
                />
                <CardContent>
                  <Typography variant="subtitle2" component="div">
                    {video.title}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProfileHome;
