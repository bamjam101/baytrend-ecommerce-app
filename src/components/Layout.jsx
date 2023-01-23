import React from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const theme = createTheme({
  palettle: {
    mode: "light",
  },
});

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
    </ThemeProvider>
  );
};

export default Layout;
