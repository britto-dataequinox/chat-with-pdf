"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { FrownIcon, PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import userSubscription from "@/utils/hooks/userSubscription";
import { Box, Typography } from "@mui/material";

const PlaceholderDocument = () => {
  const router = useRouter();

  const { isOverFileLimit } = userSubscription();

  const addDoc = () => {
    router.push("/dashboard/upload");
  };

  return (
    <>
      {isOverFileLimit ? (
        <Box className="flex flex-col items-center justify-center w-64 h-80 rounded-xl bg-gray-200 drop-shadow-md text-gray-400">
          <FrownIcon className="h-16 w-16" />
          <Typography variant="caption">Pro features coming soon...</Typography>
        </Box>
      ) : (
        <Button
          onClick={addDoc}
          className="flex flex-col items-center justify-center w-64 h-80 rounded-xl bg-gray-200 drop-shadow-md text-gray-400"
        >
          <PlusCircleIcon className="h-16 w-16" />
          <Typography variant="caption">Add a document</Typography>
        </Button>
      )}
    </>
  );
};

export default PlaceholderDocument;
