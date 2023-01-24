import {
  AppBar,
  Badge,
  Box,
  Button,
  css,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";
import React from "react";
import { getItemCount } from "../utils";
import { useSelector } from "react-redux";

const Header = () => {
  const cartItems = useSelector((state) => state.cart?.value);
  const count = getItemCount(cartItems);
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          sx={css`
            flex-grow: 1;
          `}
        >
          Ecomm App
        </Typography>
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
