import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

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
import { ProfileProps, RedirectResponse } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Avatar } from "@mui/material";
import TemporaryDrawer from "../components/Drawer";

const Navbar: React.FC = () => {
  const theme: Theme = useTheme();
  //   const navigate: NavigateFunction = useNavigate();
  const user: ProfileProps = useSelector((state: RootState) => state.user.data);

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
            <TemporaryDrawer />
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
          {!user && (
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
          )}

          {user && (
            <IconButton color="inherit">
              <Link
                to="/profile"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Avatar
                  alt={user?.first_name[0] || "Y"}
                  src={user?.thumbnail}
                />
              </Link>
            </IconButton>
          )}
          <Tooltip title="Register/Login">
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
