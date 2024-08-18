"use client";

import { useEffect } from "react";
import Banner from "./containers/Banner";
import Features from "./containers/Features";
import Samples from "./containers/Samples";
import { useAuth, useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import BtmIndustriesTitle from "./containers/BtmIndustries";
import Footer from "./containers/Footer";

export default function Home() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  if (isSignedIn) {
    return null;
  }

  return (
    <Box className="flex-1 overflow-scroll p-2 lg:p-5 bg-gradient-to-bl from-white to-red-600">
      <Box className="bg-white py-24 sm:py-32 rounded-md drop-shadow-xl">
        <Box sx={{ position: "fixed", top: 2, px: 4, py: 2 }}>
          <BtmIndustriesTitle />
        </Box>
        <Banner />
        <Samples />
        <Box py={4}>
          <Features />
        </Box>
        <Box
          sx={{
            position: "fixed",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}
