import { Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Typography
      sx={{
        background: "linear-gradient(90deg, red, darkred)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontWeight: "bold",
        textAlign: "center",
        padding: {
          xs: "8px",
          sm: "10px",
        },
        fontSize: {
          xs: "10px",
          sm: "10px",
          lg: "14px",
          xl: "14px",
        },
      }}
    >
      Copyright © BTM Industries 2024
    </Typography>
  );
};

export default Footer;
