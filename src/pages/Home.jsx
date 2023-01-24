import { useTheme } from "@emotion/react";
import { ShoppingCartRounded } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../feature/cart-slice";

const Home = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  async function fetchAllProducts() {
    const response = await fetch("https://fakestoreapi.com/products");
    const result = await response.json();
    setProducts(result);
  }

  const addProductToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid container spacing={4}>
        {products?.map(({ title, id, image, price, description, rating }) => (
          <Grid item key={id} xs={12} sm={6} md={3}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                sx={{
                  alignSelf: "center",
                  widht: theme.spacing(30),
                  height: theme.spacing(30),
                  objectFit: "contain",
                  paddingTop: theme.spacing(),
                  background: "white",
                }}
                image={image}
                alt={`${title} Image`}
              />
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    "-webkit-line-clamp": "1",
                    "-webkit-box-orient": "vertical",
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  paragraph
                  color={"text.secondary"}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    "-webkit-line-clamp": "2",
                    "-webkit-box-orient": "vertical",
                  }}
                >
                  {description}
                </Typography>
                <Typography paragraph>{`$ ${price}`}</Typography>
                <Rating readOnly precision={0.5} value={rating.rate} />
              </CardContent>
              <CardActions sx={{ alignSelf: "center" }}>
                <Button
                  size="medium"
                  onClick={() =>
                    addProductToCart({
                      title,
                      id,
                      image,
                      price,
                      description,
                      rating,
                    })
                  }
                >
                  <ShoppingCartRounded />
                  Add To Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
