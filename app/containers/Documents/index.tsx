"use server";

import React from "react";
import { auth } from "@clerk/nextjs/server";
import { adminDb } from "@/firebaseAdmin";
import Document from "./Document";
import PlaceholderDocument from "./PlacholderDocument";
import { Box } from "@mui/material";

interface DocumentData {
  id: string;
  name: string;
  downloadURL: string;
  size: number;
}

const Documents = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not found");
  }

  const documentsSnapshot = await adminDb
    .collection("users")
    .doc(userId)
    .collection("files")
    .get();

  const documents: DocumentData[] = documentsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name as string,
      downloadURL: data.downloadURL as string,
      size: data.size as number,
    };
  });

  return (
    <Box className="flex flex-wrap p-5 bg-gray-100 justify-center lg:justify-start rounded-sm gap-5 max-w-7xl mx-auto">
      {documents.map(({ id, name, downloadURL, size }) => (
        <Document
          key={id}
          id={id}
          name={name}
          size={size}
          downloadUrl={downloadURL}
        />
      ))}
      <PlaceholderDocument />
    </Box>
  );
};

export default Documents;
