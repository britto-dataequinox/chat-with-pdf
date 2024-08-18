import React from "react";
import Documents from "../containers/Documents";
import { Box, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <Box className="h-full max-w-7xl mx-auto mt-4">
      <Typography className="text-3xl p-5 bg-gray-100 font-extralight text-red-600">
        My Documents
      </Typography>
      <Documents />
    </Box>
  );
};

export default Dashboard;
Dashboard;
