import { Backdrop, CircularProgress, Typography } from "@mui/material";

const Loader = () => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: "flex",
        flexDirection: "column",
      }}
      open={true}
    >
      <CircularProgress color="inherit" size={60} />
      <Typography variant="h6" mt={2}>
        Loading...
      </Typography>
    </Backdrop>
  );
};

export default Loader;
