import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { alpha, styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem, Select } from "@mui/material";
import { fetchAllCategories } from "../feature/categories-slice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = styled("section")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: "0",
  width: "70%",
}));

const Searchbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products?.value);
  const categories = useSelector((state) => state.categories?.value);
  if (!categories?.length) {
    dispatch(fetchAllCategories());
  }

  const [selectedCategory, setSelectedCategory] = useState("all");

  function handleCategoryChange(event) {
    const value = event.target.value;
    setSelectedCategory(value);
    navigate(value === "all" ? "/" : `/?category=${value}`);
  }
  return (
    <Search>
      <Select
        value={selectedCategory}
        size="small"
        sx={{
          m: 1,
          textTransform: "capitalize",
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
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={Array.from(products, (prod) => ({
          id: prod.id,
          label: prod.title,
        }))}
        sx={{ width: "100%" }}
        renderInput={(params) => <TextField {...params} label="Products" />}
      />
    </Search>
  );
};

export default Searchbar;
