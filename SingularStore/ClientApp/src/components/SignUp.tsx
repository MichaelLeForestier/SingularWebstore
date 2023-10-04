import React, { FC, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Typography,
  TextField,
  Button,
  Container,
  Link as MuiLink,
  Grid,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type SignUpProps = RouteComponentProps;

const SignUp: FC<SignUpProps> = ({ history }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const submitData = (data: any) => {
    axios
      .post("https://localhost:7198/api/User/register", data)
      .then(function (response) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
        reset();
        setTimeout(() => {
          history.push("/login");
        }, 3000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const validatePassword = (value: string) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
    return passwordRegex.test(value) || "Password is not acceptable!";
  };

  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up Form
        </Typography>
        <form autoComplete="off" onSubmit={handleSubmit(submitData)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                {...register("firstName", {
                  required: "First Name is required!",
                })}
                error={Boolean(errors.firstName)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                {...register("lastName", {
                  required: "Last Name is required!",
                })}
                error={Boolean(errors.lastName)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                {...register("email", { required: "Email is required!" })}
                error={Boolean(errors.email)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-confirm-password">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address Type"
                variant="outlined"
                fullWidth
                {...register("addressType", {
                  required: "Address Type is required!",
                })}
                error={Boolean(errors.addressType)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Street Address"
                variant="outlined"
                fullWidth
                {...register("streetAddress", {
                  required: "Street Address is required!",
                })}
                error={Boolean(errors.streetAddress)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Suburb"
                variant="outlined"
                fullWidth
                {...register("suburb", {
                  required: "Suburb is required!",
                })}
                error={Boolean(errors.suburb)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                {...register("city", {
                  required: "City is required!",
                })}
                error={Boolean(errors.city)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Postal Code"
                variant="outlined"
                fullWidth
                {...register("postalCode", {
                  required: "Postal Code is required!",
                })}
                error={Boolean(errors.postalCode)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                {...register("phoneNumber", {
                  required: "Phone Number is required!",
                })}
                error={Boolean(errors.phoneNumber)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" color="primary" type="submit" fullWidth>
                Submit
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography
                align="center"
                variant="body2"
                style={{ marginTop: "1rem" }}
              >
                Already have an account?{" "}
                <MuiLink component={Link} to="/login" underline="none">
                  Log In
                </MuiLink>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        limit={1}
        transition={Flip}
      />
    </>
  );
};

export default SignUp;
