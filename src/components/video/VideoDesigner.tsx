import React, { ChangeEvent, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Dialog,
  DialogContent,
  Button,
  IconButton,
  Tooltip,
  useTheme,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { imageData } from "../utils/SampleData";
import AlertDialogSlide from "../profile/Dialog";
// import HereButton from "../HereButton";
import { uploadFileToYT } from "../../services/manager";
import { Upload as UploadIcon } from "@mui/icons-material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useParams } from "react-router-dom";
import { ChannelProps, ImageData } from "../../types";
import {
  UseQueryResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { axiosDelete, axiosGet } from "../../services/querycalles";
import createToast from "../../services/createToast";

const HereButton = () => {
  const theme = useTheme();
  return (
    <Tooltip title="Add thumbnail/Image">
      <IconButton
        color="primary"
        sx={{
          backgroundColor: theme.palette.primary.main,
          ":hover": {
            backgroundColor: theme.palette.primary.dark,
          },
          ml: 2,
          position: "absolute",
          right: ".625rem",
          top: "-1.75rem",
        }}
      >
        <AddRoundedIcon fontSize="large" color="secondary" />
      </IconButton>
    </Tooltip>
  );
};

const VideoDesigner: React.FC = () => {
  const [focusedImage, setFocusedImage] = useState<ImageData | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailProgress, setThumbnailProgress] = useState<number>(0);
  const [is_thumbnail, setIsThumbnail] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState("");

  const { video } = useSelector((state: RootState) => state.video.data);

  const channel: ChannelProps = JSON.parse(
    localStorage.getItem("channel") || ""
  );

  const queryClient = useQueryClient();

  const { isLoading, data, error, isSuccess }: UseQueryResult<any, any> =
    useQuery({
      queryKey: ["videos", { id: video?.id }],
      queryFn: async (): Promise<any> => {
        const response = await axiosGet<any>(
          `${process.env.REACT_APP_FILE_BACKEND_URL}/image/`,
          {
            id: video?.id,
          }
        );
        return response.data;
      },
      refetchOnWindowFocus: false,
      // refetchOnMount: false,
      retry: 2,
    });
  console.log("data: ", data);

  const handleCardClick = (image: ImageData) => {
    setFocusedImage(image);
  };

  const handleClose = () => {
    setFocusedImage(null);
  };

  const handleThumbnailChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setThumbnailFile(event.target.files[0]);
    }
  };

  const handleThumbnailUpload = () => {
    if (!thumbnailFile) {
      alert("Please select a image first");
      return;
    }
    uploadFileToYT(
      thumbnailFile,
      `${process.env.REACT_APP_FILE_BACKEND_URL}/image/bucket/upload`,
      setThumbnailProgress,
      "image",
      {
        id: video?.id,
        title: thumbnailFile.name,
        is_thumbnail,
        channelId: channel.id,
      }
    ).then(() => {
      queryClient.invalidateQueries({
        queryKey: ["videos", { id: video?.id }],
      });
      setThumbnailFile(null);
    });
  };

  const handleDelete = async () => {
    console.log("delete");
    try {
      await axiosDelete(
        `${process.env.REACT_APP_FILE_BACKEND_URL}/image/${focusedImage?.id}`
      );
      queryClient.invalidateQueries({
        queryKey: ["videos", { id: video?.id }],
      });
      handleClose();
      createToast("Image deleted successfully", "success");
    } catch (error: any) {
      console.error("Error deleting image: ", error);
      createToast("Error deleting image", "error");
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2, position: "relative" }}>
      <Grid container spacing={2}>
        {data &&
          data?.images?.map((image: ImageData) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
              <Card
                sx={{ cursor: "pointer" }}
                component="div"
                onClick={() => handleCardClick(image)}
              >
                <CardMedia
                  component="img"
                  alt={image.title}
                  height="140"
                  image={`${process.env.REACT_APP_FILE_BACKEND_URL}/uploads/${image.backend_name}`}
                />
                <CardContent>
                  <Typography variant="subtitle2" component="div">
                    {image.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
      <AlertDialogSlide button={<HereButton />}>
        <Box p={4}>
          <Box
            width={500}
            height={300}
            display="flex"
            justifyContent="center"
            alignItems="center"
            border="2px dashed grey"
            borderRadius={4}
            position="relative"
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
          <FormControlLabel
            sx={{ mt: 1 }}
            required
            value={is_thumbnail}
            onChange={() => setIsThumbnail(!is_thumbnail)}
            control={<Checkbox />}
            label="Thumnail"
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 1,
            }}
          >
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
              Save
            </Button>
          </Box>
        </Box>
      </AlertDialogSlide>

      {focusedImage && (
        <Dialog open={true} onClose={handleClose}>
          <DialogContent>
            <img
              src={`${process.env.REACT_APP_FILE_BACKEND_URL}/uploads/${focusedImage.backend_name}`}
              alt={focusedImage.title}
              style={{ width: "100%", height: "auto" }}
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
            >
              <Typography variant="h6" component="div">
                {focusedImage.title}
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={handleDelete}
                sx={{ mt: 2 }}
              >
                Delete
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default VideoDesigner;
