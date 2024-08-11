"use client";

import { Button } from "@/components/ui/button";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Banner = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleClick = () => {
    setLoading(true);
    router.push("/dashboard");
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, py: 4 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Card
            variant="outlined"
            sx={{
              border: "2px solid",
              borderColor: "transparent",
              background: "linear-gradient(to bottom, red, white) border-box",
              backgroundClip: "padding-box, border-box",
              borderRadius: 2,
              p: 0,
              mb: { xs: 4, md: 0 },
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
                px: { xs: 2, sm: 4 },
                py: 4,
                background:
                  "linear-gradient(to bottom, rgba(255, 0, 0, 0.1), rgba(255, 255, 255, 0.1))",
              }}
            >
              <Typography
                color={"#fff"}
                textAlign={{ xs: "center", md: "left" }}
              >
                BTM INDUSTRIES PRESENTS
              </Typography>
              <Typography
                variant="h4"
                fontWeight={"bold"}
                textAlign={{ xs: "center", md: "left" }}
              >
                CHAT WITH PDF'S
              </Typography>
              <Typography
                variant="subtitle1"
                color={"inherit"}
                textAlign={{ xs: "center", md: "left" }}
              >
                Turn confusion into clarity with our site, making it easy to
                find answers within your PDF files.
              </Typography>
              <Typography
                variant="subtitle2"
                fontWeight={"bold"}
                textAlign={{ xs: "center", md: "left" }}
              >
                AI Assistant Powered By{" "}
                <span style={{ color: "red" }}>GEMINI</span>
              </Typography>
              <Box sx={{ textAlign: { xs: "center", md: "left" }, mt: 3 }}>
                <Button onClick={handleClick} disabled={loading}>
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Get Started"
                  )}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            variant="outlined"
            sx={{
              border: "2px solid",
              borderColor: "transparent",
              background: "linear-gradient(to bottom, red, white) border-box",
              backgroundClip: "padding-box, border-box",
              borderRadius: 2,
              p: 0,
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
                px: { xs: 2, sm: 4 },
                py: 4,
                background:
                  "linear-gradient(to bottom, rgba(255, 0, 0, 0.1), rgba(255, 255, 255, 0.1))",
              }}
            >
              <Typography
                color={"#fff"}
                textAlign={{ xs: "center", md: "left" }}
              >
                JOIN WITH BTM INDUSTRIES
              </Typography>
              <Typography
                variant="h4"
                fontWeight={"bold"}
                textAlign={{ xs: "center", md: "left" }}
              >
                REACH OUT
              </Typography>
              <Typography
                variant="subtitle2"
                color={"inherit"}
                textAlign={{ xs: "center", md: "left" }}
              >
                <span style={{ fontWeight: "bold" }}>BTM Industries</span>{" "}
                offers a remote software development platform that delivers
                high-quality code, transparent communication, and timely
                results. Our experienced team brings your vision to life with a
                seamless and cost-efficient process.
              </Typography>
              <Box sx={{ textAlign: { xs: "center", md: "left" }, mt: 3 }}>
                <Button asChild>
                  <Link href={"mailto:btm15037@gmail.com"}>btmindustries</Link>
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Banner;
