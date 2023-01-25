import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { calculateSubtotal } from "../utils";

const Cart = () => {
  const theme = useTheme();
  const cart = useSelector((state) => state.cart?.value);
  return (
    <Container
      sx={{
        py: 8,
      }}
    >
      <Grid container spacing={2}>
        <Grid item container spacing={2} md={8}>
          {cart?.map(({ product, quantity }) => {
            const { title, id, price, description, rating, image } = product;
            return (
              <Grid item key={id} xs={12}>
                <Card
                  sx={{
                    display: "flex",
                    py: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={image}
                    sx={{
                      width: theme.spacing(30),
                      height: "100%",
                      objectFit: "contain",
                      padding: theme.spacing(),
                    }}
                    alt={`${title} Image`}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      <Typography variant="h5">{title}</Typography>
                      <Rating readOnly precision={0.5} value={rating.rate} />
                      <form>
                        <TextField
                          label="Quantity"
                          value={quantity}
                          sx={{
                            width: theme.spacing(8),
                          }}
                          type="number"
                          id={`${id}-product-id`}
                          variant="standard"
                          inputProps={{
                            min: 0,
                            max: 10,
                          }}
                        />
                      </form>
                    </Box>
                    <Box>
                      <Typography variant="h6" paragraph>
                        $ {calculateSubtotal([{ product, quantity }])}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Grid item md={4}>
          <Typography variant="h5">Subtotal</Typography>
          <Typography variant="h6">{calculateSubtotal(cart)}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
