import { Alert } from "@mui/material";
import React from "react";

const MessagePopup = ({ type, message }) => {
  // types = error, warning, info, success
  return (
    <Alert
      variant="filled"
      severity={type}
      style={{ position: "absolute", top: "10%", width: "30%", zIndex: 5 }}
    >
      {message}
    </Alert>
  );
};

export default MessagePopup;
