import React, { useState, ChangeEvent, FormEvent } from "react";
import AlertDialogSlide from "./profile/Dialog";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Box,
  Autocomplete,
  Dialog,
} from "@mui/material";
import axios from "axios";
import createToast from "../services/createToast";
import { axiosPostRequest } from "../services/querycalles";
import { useQueryClient } from "@tanstack/react-query";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";

interface MemberType {
  name: string;
  value: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface FormData {
  email: string;
  memberType: MemberType;
  first_name: string;
  last_name: string;
}

const members: MemberType[] = [
  { name: "", value: "" },
  { name: "Video Editor", value: "editor" },
  { name: "Designer", value: "designer" },
  { name: "Content Writer", value: "writer" },
  { name: "Manager", value: "manager" },
];

const AddMember: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    memberType: members[0], // Default to the first member type
    first_name: "",
    last_name: "",
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMemberTypeChange = (
    event: React.SyntheticEvent,
    value: MemberType | null
  ) => {
    setFormData({
      ...formData,
      memberType: value || members[0], // Default to the first member type if no value
    });
  };

  const queryClient = useQueryClient();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle submit logic here
    // await axios
    //   .post("/user/add-member", formData)
    //   .then((response) => {
    //     createToast("success", response.data.message);
    //   })
    //   .catch((error) => {
    //     createToast(
    //       "error",
    //       error?.message ||
    //         error?.message ||
    //         error?.response?.data.message ||
    //         "An error occurred"
    //     );
    //   });
    axiosPostRequest("/user/add-member", {}, formData)
      .then((response) => {
        console.log("response: ", response);
        createToast("member added successfully", "success");
        queryClient.invalidateQueries({
          queryKey: ["members"],
        });
        handleClose();
      })
      .catch((error) => {
        console.error("Error adding member: ", error.response.data);
        createToast(
          error?.response?.data.error || error?.message || "An error occurred",
          "error"
        );
        handleClose();
      });
  };

  return (
    <React.Fragment>
      <div style={{ cursor: "pointer" }} onClick={handleClickOpen}>
        <Button variant="contained" color="primary">
          Add Member
        </Button>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <div
          style={{
            marginTop: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "40rem",
            padding: "4rem",
          }}
        >
          <Typography component="h1" variant="h5">
            Add Member
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{ width: "100%", marginTop: "16px" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="first_name"
                  label="First Name"
                  name="first_name"
                  autoFocus
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ width: "100%" }}>
                  <Typography sx={{ fontSize: "large" }}>
                    Member Type
                  </Typography>
                  <Autocomplete
                    id="member"
                    onChange={handleMemberTypeChange}
                    options={members}
                    getOptionLabel={(option) => {
                      if (option.name === "") return "Select Member Type";
                      return option.name;
                    }}
                    value={formData.memberType}
                    renderInput={(params) => (
                      <TextField {...params} id="member" />
                    )}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Add Member
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default AddMember;
