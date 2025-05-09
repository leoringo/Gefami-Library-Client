import React from "react";
import { useDispatch } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { useAppSelector } from "../../store/store";
import { closeError } from "./globalErrorSlice";

const GlobalError: React.FC = () => {
  const { open, message } = useAppSelector((state) => state.globalError);
  const dispatch = useDispatch();

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => dispatch(closeError())}
      anchorOrigin={{ vertical: "top", horizontal: "center" }} 
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto", 
      }}
    >
      <Alert
        severity="error"
        onClose={() => dispatch(closeError())}
        sx={{
          width: "100%",
          fontSize: "1rem",
          fontWeight: "bold",
          alignItems: "center",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalError;
