import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { alpha, styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem, Select } from "@mui/material";
import { fetchAllCategories } from "../feature/categories-slice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "@emotion/react";
import { SearchOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const StyledSearch = styled("section")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  display: "grid",
  placeItems: "center",
  gridTemplateColumns: "minmax(100px, 15%) 1fr",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  width: "80%",
}));

const StyledAutoComplete = styled(Autocomplete)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiTextField-root": {
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
  },
  "& .MuiInputBase-input": {
    color: theme.palette.common.white,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderWidth: "0",
  },
  "& .MuiSvgIcon-root": {
    fill: theme.palette.common.white,
  },
}));

const SearchIconWrapper = styled("section")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: "0",
  pointerEvents: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const Searchbar = () => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const searchTerm = searchParams.get("searchTerm");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products?.value);
  const categories = useSelector((state) => state.categories?.value);
  if (!categories?.length) {
    dispatch(fetchAllCategories());
  }

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);

  function handleCategoryChange(event) {
    const value = event.target.value;
    navigate(
      value === "all"
        ? "/"
        : `/?category=${value}${searchTerm ? "&searchterm=" + searchTerm : ""}`
    );
  }

  function handleSearchChange(searchText) {
    if (searchText) {
      navigate(
        selectedCategory === "all"
          ? `?searchterm=${searchText}`
          : `/?category=${selectedCategory}&searchterm=${searchText}`
      );
    } else {
      navigate(
        selectedCategory === "all" ? `/` : `/?category=${selectedCategory}`
      );
    }
  }

  useEffect(() => {
    setSelectedCategory(category ? category : "all");
  }, [category]);
  return (
    <StyledSearch>
      <Select
        value={selectedCategory}
        size="small"
        sx={{
          m: 1,
          textTransform: "capitalize",
          "&": {
            "::before": {
              ":hover": {
                border: "none",
              },
            },
            "::before, &::after": {
              border: "none",
            },
            ".MuiSelect-standard": {
              color: "common.white",
            },
            ".MuiSelect-icon": {
              fill: theme.palette.common.white,
            },
          },
        }}
        variant="standard"
        labelId="selected-category"
        id="selected-category-id"
        onChange={handleCategoryChange}
      >
        <MenuItem sx={{ textTransform: "capitalize" }} value="all">
          all
        </MenuItem>
        {categories?.map((category) => (
          <MenuItem
            sx={{ textTransform: "capitalize" }}
            key={category}
            value={category}
          >
            {category}
          </MenuItem>
        ))}
      </Select>
      <StyledAutoComplete
        freeSolo
        id="selected-product"
        value={selectedProduct}
        disablePortal
        options={Array.from(
          selectedCategory === "all"
            ? products
            : products.filter(
                (product) => product.category === selectedCategory
              ),
          (prod) => ({
            id: prod.id,
            label: prod.title,
          })
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={selectedProduct ? "Product" : "Products"}
          />
        )}
        onChange={(e, value) => {
          handleSearchChange(value?.label);
          setSelectedProduct(value?.label);
        }}
      />
      <SearchIconWrapper>
        <SearchOutlined />
      </SearchIconWrapper>
    </StyledSearch>
  );
};

export default Searchbar;
