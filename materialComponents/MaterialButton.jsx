import * as React from "react";
import Button from "@mui/material/Button";

export default function MaterialBtn({ buttonName, buttonVariant, buttonFunction, disableButton }) {
  return (
    <Button
      variant={buttonVariant}
      onClick={buttonFunction}
      disabled={disableButton}
    >
      {buttonName}
    </Button>
  );
}
