import { Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";

const PaymentForm = () => {
  function handleChange(event) {}
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <Box component={"form"} onChange={handleChange}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              variant="standard"
              required
              name="name"
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
            ></TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="standard"
              required
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
            ></TextField>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PaymentForm;
