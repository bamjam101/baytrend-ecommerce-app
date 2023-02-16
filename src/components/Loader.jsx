import { Box, LinearProgress } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        position: "absolute",
        display: "grid",
        placeItems: "center",
      }}
    >
      <LinearProgress />
    </Box>
  );
};

export default Loader;
