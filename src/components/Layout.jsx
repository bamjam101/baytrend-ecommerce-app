import React from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline, useMediaQuery } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const customPalette = (mode) => ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: "#d9d9d9d9",
            divider: "#d9d9d9"[200],
            text: {
              primary: "#808080bf"[900],
              secondary: "#8080807f"[800],
            },
          }
        : {
            primary: "#191919",
            divider: "#191919"[700],
            background: {
              default: "#191919"[900],
              paper: "#191919"[900],
            },
            text: {
              primary: "#a4a4a4",
              secondary: "#c4c4c4"[500],
            },
          }),
    },
  });
  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? "dark" : "light",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </ThemeProvider>
  );
};

export default Layout;
