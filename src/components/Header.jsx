import {
  AppBar,
  Badge,
  Box,
  Button,
  css,
  IconButton,
  Menu,
  MenuItem,
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
import { useTheme } from "@emotion/react";
import { useAuth } from "../firebase/Auth";
import { AccountCircleRounded } from "@mui/icons-material";
import { useState } from "react";

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: "none",
}));

const Header = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const [anchor, setAnchor] = useState(null);
  const isMenuOpen = Boolean(anchor);
  function handleMenuOpen(event) {
    setAnchor(event.currentTarget);
  }
  function handleMenuClose() {
    setAnchor(null);
  }
  async function logout() {
    await signOutUser(user);
    navigate("/login");
  }
  const renderMenu = (
    <Menu
      anchorEl={anchor}
      id="user-profile-menu"
      keepMounted
      transformOrigin={{
        horizontal: "right",
        vertical: "top",
      }}
      anchorOrigin={{
        horizontal: "right",
        vertical: "bottom",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );
  const cartItems = useSelector((state) => state.cart?.value);
  const count = getItemCount(cartItems);

  function navigateToCart() {
    navigate("/cart");
  }
  return (
    <>
      <AppBar position="sticky" sx={{ py: 1 }}>
        <Toolbar
          sx={{
            display: "flex",
            gap: { xs: 1, md: 2 },
          }}
        >
          <Typography
            variant="h6"
            color="inherit"
            sx={css`
              flex-grow: 1;
            `}
          >
            <StyledLink sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }} to="/">
              BayTrend
            </StyledLink>
          </Typography>
          <Searchbar />
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <IconButton
              size="small"
              aria-label="Shows cart items count"
              sx={css`
                transition: background-color 0.45s, color 0.45s;
                &:hover {
                  background-color: ${theme.palette.common.white};
                  color: ${theme.palette.common.black};
                }
              `}
              onClick={navigateToCart}
            >
              <Badge badgeContent={count} color="error">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
            {user ? (
              <Button
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: "0.5rem",
                }}
                size="small"
                color="inherit"
                onClick={handleMenuOpen}
              >
                <AccountCircleRounded />
                {user.displayName ?? user.email}
              </Button>
            ) : (
              <Button
                size="large"
                color="inherit"
                sx={{ display: { xs: "none", md: "flex" } }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </>
  );
};

export default Header;
