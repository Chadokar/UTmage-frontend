import { Button, Container, TextField, Typography } from "@mui/material";
import React from "react";
import { axiosPostRequest } from "../services/querycalles";
import { AxiosResponse } from "axios";
import { OtpVerifyResponse } from "../types";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = React.useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response: AxiosResponse<OtpVerifyResponse> = await axiosPostRequest(
        "/user/otp-verify",
        {},
        {
          otp,
          token: localStorage.getItem("otptoken"),
        }
      );
      if (response.data.success) {
        localStorage.removeItem("otptoken");
        localStorage.setItem("verifiedtoken", response.data.token);
        navigate(`/resetpassword/${response.data.token}`);
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
        Verify OTP
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        id="otp"
        label="OTP"
        name="otp"
        autoFocus
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
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

export default VerifyOtp;
