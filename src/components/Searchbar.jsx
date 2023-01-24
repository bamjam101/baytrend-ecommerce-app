import { Autocomplete } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import React from "react";

const Search = styled("section")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: "0",
  width: "100%",
}));
const Searchbar = () => {
  return (
    <Search>
      {/* <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={top100Films}
  sx={{ width: 300 }}
  renderInput={(params) => <TextField {...params} label="Movie" />}
/> */}
    </Search>
  );
};

export default Searchbar;
