import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { promises } from "./promises.jsx";
import { getCallback } from "./callBack.jsx";
import { getdata } from "./asyncAwait.jsx";
import CustomizedSnackbars from "../materialComponents/snackBar.jsx";

export default function BasicButtons() {
    const [products, setProducts] = React.useState([]);
    // Function to get products list
    function getDataFromAsyncAwait(data) {
      console.log("In parent Fetching data using async/await...", data);
      if (data.products && data.products.length > 0) {
        setProducts(data.products);
      }
    } 
  return (
    <div>
      <Stack spacing={2} direction="row">
        <Button
          variant="text"
          onClick={() => {
            promises();
          }}
        >
          Promises
        </Button>
        <Button variant="contained" onClick={()=>{getdata(getDataFromAsyncAwait)}}>
          AsyncAwait
        </Button>
        <Button variant="outlined" onClick={getCallback}>
          CallBack
        </Button>
      </Stack>
      {products && products.length > 0 ? (
        <CustomizedSnackbars
          openSnackbar={true}
          text="Product list retrieved successfully!"
        />
      ) : null}
    </div>
  );
}
