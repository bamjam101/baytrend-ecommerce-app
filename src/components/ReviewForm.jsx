import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { calculateSubtotal } from "../utils";

const ReviewForm = () => {
  const theme = useTheme();
  const cart = useSelector((state) => state.cart.value);
  const address = useSelector((state) => state.checkout.address);
  const addresses = address ? Object.values(address) : [];
  const payment = useSelector((state) => state.checkout.payment);
  const payments = payment
    ? [
        { type: "Card Type", detail: "Visa" },
        { type: "Card Number", detail: payment.cardNumber },
        { type: "Card Holder", detail: payment.name },
      ]
    : [];
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {cart?.map(({ product, quantity }) => {
          return (
            <ListItem key={product.title} sx={{ py: 1, px: 0 }}>
              <ListItemText
                sx={{
                  "& .MuiListItemText-primary": {
                    fontWeight: 500,
                  },
                  "& .MuiListItemText-secondary": {
                    fontSize: theme.spacing(2),
                  },
                }}
                primary={product.title}
                secondary={`Qty ${quantity}`}
              />
              <Typography variant="body2">{`$ ${calculateSubtotal([
                { product, quantity },
              ]).toFixed(2)}`}</Typography>
            </ListItem>
          );
        })}
        <ListItem
          sx={{
            py: 1,
            px: 0,
          }}
        >
          <ListItemText primary="Total" />
          <Typography
            variant="subtitle"
            sx={{
              fontWeight: 700,
            }}
          >{`$ ${calculateSubtotal(cart).toFixed(2)}`}</Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography>{addresses.join(", ")}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item container xs={12} sm={6} direction="column">
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment Method
          </Typography>
          <Grid container>
            {payments?.map(({ type, detail }) => (
              <>
                <Grid item key={type} xs={6}>
                  <Typography gutterBottom>{type}</Typography>
                </Grid>
                <Grid item key={detail} xs={6}>
                  <Typography gutterBottom>{detail}</Typography>
                </Grid>
              </>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ReviewForm;
