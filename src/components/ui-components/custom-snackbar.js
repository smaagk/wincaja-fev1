import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CustomSnackBar({ status }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(status)
    setOpen(true);
  }, [status]);

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={status.severity}>
        {status.msg}
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackBar;
