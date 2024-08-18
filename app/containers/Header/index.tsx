"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useTheme,
  Box,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { FilePlus2, FileText } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        background:
          "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,255,255,1) 100%)",
      }}
    >
      <Toolbar className="flex justify-between">
        <Typography
          variant="h6"
          component={Link}
          href="/dashboard"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          Chat to{" "}
          <span style={{ color: "black", fontWeight: "bold" }}>PDF</span>
        </Typography>
        <SignedIn>
          <Box className="flex items-center space-x-2">
            {isMobile ? (
              <IconButton
                component={Link}
                href="/dashboard"
                sx={{ color: "white" }}
              >
                <FileText style={{ color: "red" }} />
              </IconButton>
            ) : (
              <Button
                variant="outlined"
                component={Link}
                href="/dashboard"
                sx={{ color: "red", borderColor: "red" }}
              >
                My Documents
              </Button>
            )}
            <IconButton
              component={Link}
              href="/dashboard/upload"
              edge="start"
              sx={{ color: "white", borderColor: "white" }}
            >
              <FilePlus2 style={{ color: "red" }} />
            </IconButton>
            <UserButton />
          </Box>
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
