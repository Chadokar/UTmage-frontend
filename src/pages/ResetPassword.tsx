import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { axiosPutRequest } from "../services/querycalles";
import { AxiosResponse } from "axios";
import { OtpVerifyResponse } from "../types";
import { useNavigate } from "react-router-dom";
import createToast from "../services/createToast";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ResetPassword = () => {
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      createToast("Passwords do not match", "error");
      return;
    }
    try {
      const response: AxiosResponse<OtpVerifyResponse> = await axiosPutRequest(
        "/user/update",
        {},
        {
          password,
          token: localStorage.getItem("verifiedtoken"),
        }
      );
      localStorage.removeItem("verifiedtoken");
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        createToast("Password reset successfully", "success");
        navigate(`/`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        mt: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Typography component="h1" variant="h5">
        Reset Password
      </Typography>
      <TextField
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        fullWidth
        margin="normal"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Confirm Password"
        name="confirmPassword"
        type={showPassword ? "text" : "password"}
        fullWidth
        margin="normal"
        variant="outlined"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <Button
        type="submit"
        onClick={handleSubmit}
        fullWidth
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
    </Container>
  );
};

export default ResetPassword;
