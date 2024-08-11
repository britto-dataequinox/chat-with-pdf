import features from "@/features";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";

const Features = () => {
  return (
    <Box sx={{ px: 2 }}>
      <Card
        variant="outlined"
        sx={{
          border: "2px solid",
          borderColor: "transparent",
          background: "linear-gradient(to bottom, red, white) border-box",
          backgroundClip: "padding-box, border-box",
          borderRadius: 2,
          p: 0,
          mb: 4,
          boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.05)",
          overflow: "hidden",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            borderRadius: 2,
            padding: "2px",
            background: "inherit",
            mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "source-out",
            maskComposite: "subtract",
          },
        }}
      >
        <CardHeader
          title={
            <Typography
              textAlign={"center"}
              variant="h5"
              fontWeight={"bold"}
              mt={4}
            >
              Features
            </Typography>
          }
        />
        <CardContent
          sx={{
            px: 2,
            background:
              "linear-gradient(to bottom, rgba(255, 0, 0, 0.1), rgba(255, 255, 255, 0.1))",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{ maxWidth: "1200px", margin: "0 auto" }}
          >
            {features?.map((feature: any, index: any) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
                  <Typography
                    fontWeight="bold"
                    sx={{ display: "inline", color: "black" }}
                  >
                    <feature.icon style={{ color: "black" }} />
                  </Typography>
                  <Typography
                    px={2}
                    variant="body2"
                    color="black"
                    fontWeight={650}
                    component="dd"
                    sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }} // Responsive font size
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Features;
