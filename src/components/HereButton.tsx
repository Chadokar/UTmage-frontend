import { IconButton, Tooltip } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

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

export default HereButton;
