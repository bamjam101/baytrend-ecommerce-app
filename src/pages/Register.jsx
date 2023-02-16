import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../firebase/Auth";

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { signUp } = useAuth();

  async function registerUser(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    await signUp(
      data.get("email"),
      data.get("password"),
      data.get("name")
    ).then(() => navigate("/login"));
  }
  return (
    <Container component={"main"} maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          sx={{
            m: 1,
            backgroundColor: "secondary.main",
          }}
        >
          <LockOutlined />
        </Avatar>
        <Typography component={"h1"} variant="h5">
          Sign Up
        </Typography>
        <form
          sx={{
            mt: theme.spacing(),
            width: "100%",
          }}
          onSubmit={registerUser}
        >
          <Grid container sx={{ gap: 2 }}>
            <TextField
              name="name"
              id="name"
              autoFocus
              label="Name"
              fullWidth
              required
            ></TextField>
            <TextField
              name="email"
              id="email"
              autoComplete="email"
              autoFocus
              label="Email"
              fullWidth
              required
            ></TextField>
            <TextField
              name="password"
              id="password"
              type={"password"}
              autoFocus
              sx={{
                padding: "0",
                margin: "0",
              }}
              label="Password"
              fullWidth
              required
            ></TextField>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, width: "100%" }}
          >
            Register
          </Button>
          <Grid container justifyContent={"center"}>
            <Grid item>
              <Typography paragraph>
                Already have an account? Go to <Link to={"/login"}>Login</Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
