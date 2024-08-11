import React from "react";
import { Box, Typography } from "@mui/material";

const PdfThumbnail = () => {
  return (
    <Box
      className="pdf-thumbnail"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="150px" // Set a fixed height for consistent alignment
      border={1} // Optional: add a border for visual clarity
      borderColor="grey.400" // Optional: set border color
      borderRadius={1} // Optional: add border radius
    >
      <Typography variant="body1" color="textSecondary">
        No preview available
      </Typography>
    </Box>
  );
};

export default PdfThumbnail;
