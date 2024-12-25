import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import React from "react";
import { axiosPostRequest } from "../services/querycalles";
import { OtpVerifyResponse } from "../types";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response: AxiosResponse<OtpVerifyResponse> = await axiosPostRequest(
        "/user/otp",
        {},
        {
          email,
        }
      );
      if (response.data.success) {
        localStorage.setItem("otptoken", response.data.token);
        navigate(`/verifytoken/${response.data.token}`);
      }
    } catch (error) {
      // console.error(error);
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
        Forgot Password
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        type="submit"
        onClick={handleSubmit}
        fullWidth
        variant="contained"
        color="primary"
      >
        Send OTP
      </Button>
    </Container>
  );
};

export default ForgotPassword;
