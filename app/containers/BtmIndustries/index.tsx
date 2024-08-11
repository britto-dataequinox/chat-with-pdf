import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const BtmIndustriesTitle = () => {
  const title = "BTM INDUSTRIES";
  const [currentText, setCurrentText] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentText((prevText) => {
        const newIndex = (prevText.length + 1) % (title.length + 1);
        return title.slice(0, newIndex);
      });
    }, 300);

    return () => clearInterval(intervalId);
  }, [title]);

  return (
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
      <CardContent
        sx={{
          px: isMobile ? 2 : 4,
          py: isMobile ? 2 : 4,
          background:
            "linear-gradient(to bottom, rgba(255, 0, 0, 0.1), rgba(255, 255, 255, 0.1))",
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h2"}
          sx={{
            color: "#2c3e50",
            fontWeight: "bold",
            letterSpacing: 2,
            textTransform: "uppercase",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            animation: `fadeIn 0.5s ease-in-out`,
            "@keyframes fadeIn": {
              from: {
                opacity: 0,
                transform: "translateY(-20px)",
              },
              to: {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          }}
        >
          {currentText}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BtmIndustriesTitle;
