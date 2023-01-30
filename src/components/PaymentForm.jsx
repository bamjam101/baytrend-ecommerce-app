import { Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePayment } from "../feature/checkout-slice";

const PaymentForm = () => {
  const payment = useSelector((state) => state.checkout?.payment);
  const dispatch = useDispatch();
  function handleChange(event) {
    const { name, value } = event.target;
    dispatch(updatePayment({ [name]: value }));
  }
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
              id="name"
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
              defaultValue={payment?.name}
            ></TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="standard"
              name="cardNumber"
              id="cardNumber"
              required
              label="Card Number"
              fullWidth
              defaultValue={payment?.cardNumber}
              autoComplete="cc-number"
            ></TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="standard"
              name="expDate"
              id="expDate"
              required
              label="Expiry Date"
              fullWidth
              defaultValue={payment?.expDate}
              autoComplete="cc-exp"
            ></TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type={"password"}
              variant="standard"
              name="cvv"
              id="cvv"
              required
              label="CVV"
              fullWidth
              autoComplete="cc-ccv"
              defaultValue={payment?.cvv}
            ></TextField>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PaymentForm;
