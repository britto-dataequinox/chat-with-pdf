import PdfViewer from "@/app/containers/PdfViewer";
import Chat from "@/app/containers/Sidebar/ChatBox";
import { adminDb } from "@/firebaseAdmin";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import { Grid, Box } from "@mui/material";

const page = async ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
  auth().protect();
  const { userId } = await auth();

  const ref = await adminDb
    .collection("users")
    .doc(userId!)
    .collection("files")
    .doc(id)
    .get();

  const url = ref.data()?.downloadURL;
  return (
    <Grid container direction="row" sx={{ height: "100%", overflow: "hidden" }}>
      <Grid item xs={12} sm={12} lg={4} sx={{ overflowY: "hidden" }}>
        <Chat id={id} />
      </Grid>
      <Grid
        item
        mt={5}
        xs={12}
        sm={12}
        lg={8}
        sx={{
          backgroundColor: "gray.100",
          order: { lg: -1 },
          overflow: "auto",
          zIndex: 0,
        }}
      >
        <PdfViewer url={url} />
      </Grid>
    </Grid>
  );
};

export default page;
