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
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/Auth";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, signIn } = useAuth();
  async function login(event) {
    event.preventDefault();
    const { email, password } = event.target;
    await signIn(email.value, password.value);
    navigate("/");
  }

  // useEffect(() => {
  //   if (user) {
  //     navigate("/");
  //   }
  // }, [user]);
  return (
    <Container component={"main"} maxWidth="xs">
      <CssBaseline />
      <Box
        xs={{
          marginTop: "8rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          sx={{
            m: 1,
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <LockOutlined />
        </Avatar>
        <Typography component={"h1"} variant="h5">
          Sign In
        </Typography>
        <form
          sx={{
            widht: "100%",
            mt: "1rem",
          }}
          onSubmit={login}
        >
          <TextField
            variant="outlined"
            margin="normal"
            label="Email"
            required
            fullWidth
            id="email"
            name="email"
            autoFocus
            autoComplete="off"
          ></TextField>
          <TextField
            variant="outlined"
            type="password"
            margin="normal"
            label="Password"
            required
            fullWidth
            id="password"
            name="password"
            autoComplete="off"
          ></TextField>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            sx={{
              margin: theme.spacing(3, 0, 2),
            }}
          >
            Submit
          </Button>
        </form>
        <Grid container justifyContent={"center"}>
          <Grid item>
            <Typography paragraph>
              New User? Go to <Link to={"/register"}>Sign Up</Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
