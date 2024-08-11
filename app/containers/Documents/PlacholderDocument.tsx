"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { FrownIcon, PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import userSubscription from "@/utils/hooks/userSubscription";
import { Box } from "@mui/material";

const PlaceholderDocument = () => {
  const router = useRouter();

  const { isOverFileLimit } = userSubscription();

  const addDoc = () => {
    router.push("/dashboard/upload");
  };

  return (
    <>
      {isOverFileLimit ? (
        <div className="flex flex-col items-center justify-center w-64 h-80 rounded-xl bg-gray-200 drop-shadow-md text-gray-400">
          <FrownIcon className="h-16 w-16" />
          <p>Pro features coming soon...</p>
        </div>
      ) : (
        <Button
          onClick={addDoc}
          className="flex flex-col items-center justify-center w-64 h-80 rounded-xl bg-gray-200 drop-shadow-md text-gray-400"
        >
          <PlusCircleIcon className="h-16 w-16" />
          <p>Add a document</p>
        </Button>
      )}
    </>
  );
};

export default PlaceholderDocument;
