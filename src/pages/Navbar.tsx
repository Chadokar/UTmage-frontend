import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Theme, useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import GoogleIcon from "@mui/icons-material/Google";
import {
  Link,
  Outlet,
  //  useNavigate, NavigateFunction
} from "react-router-dom";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { axiosGet } from "../services/querycalles";
import { RedirectResponse } from "../types";

const Navbar: React.FC = () => {
  const theme: Theme = useTheme();
  //   const navigate: NavigateFunction = useNavigate();

  const {
    mutate: redirectCall,
  }: UseMutationResult<RedirectResponse, Error, void> = useMutation({
    mutationKey: ["updateData"],
    mutationFn: async (): Promise<RedirectResponse> => {
      const response = await axiosGet<RedirectResponse>(
        "/googleauth/google/auth"
      );
      return response.data;
    },
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff delay
    onSuccess: (response) => {
      console.log("response: ", response.url);
      window.location.href = response.url;
    },
  });

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Company Logo
            </Link>
          </Typography>
          <Button
            color="inherit"
            sx={{
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            }}
          >
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Login
            </Link>
          </Button>
          <Tooltip title="Register">
            <IconButton
              color="inherit"
              sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                ml: 2, // Add some margin to separate the buttons
              }}
              onClick={() => redirectCall()}
            >
              <GoogleIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default Navbar;
