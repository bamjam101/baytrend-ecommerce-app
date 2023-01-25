import {
  AppBar,
  Badge,
  Box,
  Button,
  css,
  IconButton,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";
import React from "react";
import { getItemCount } from "../utils";
import { useSelector } from "react-redux";
import Searchbar from "./Searchbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: "none",
}));

const Header = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart?.value);
  const count = getItemCount(cartItems);

  function navigateToCart() {
    navigate("/cart");
  }
  return (
    <AppBar position="sticky" sx={{ py: 1 }}>
      <Toolbar
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Typography
          variant="h6"
          color="inherit"
          sx={css`
            flex-grow: 1;
          `}
        >
          <StyledLink to="/">BayTrend</StyledLink>
        </Typography>
        <Searchbar />
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: "1rem" }}>
          <IconButton
            size="large"
            aria-label="Shows cart items count"
            sx={css`
              transition: background-color 0.45s;
              &:hover {
                background-color: white;
              }
            `}
            onClick={navigateToCart}
          >
            <Badge badgeContent={count} color="error">
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>
          <Button size="large" color="inherit">
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
