import React from "react";
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
  Rating,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToCart } from "../feature/cart-slice";
import { fetchAllProducts } from "../feature/product-slice";

const Home = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.products);
  const { value: products, loading } = state ?? {};

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const searchTerm = searchParams.get("searchterm");
  let filteredProducts =
    category && category !== "all"
      ? products?.filter((product) => product.category === category)
      : products;
  filteredProducts = searchTerm
    ? filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredProducts;

  const addProductToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  if (!products?.length) {
    dispatch(fetchAllProducts());
  }
  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid container spacing={4}>
        {filteredProducts?.map(
          ({ title, id, image, price, description, rating }) => (
            <Grid item key={id} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  padding: theme.spacing(2, 0),
                }}
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
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical",
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
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {description}
                  </Typography>
                  <Typography paragraph>{`$${price}`}</Typography>
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
          )
        )}
      </Grid>
    </Container>
  );
};

export default Home;
