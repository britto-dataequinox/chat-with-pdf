import PdfViewer from "@/app/containers/PdfViewer";
import Chat from "@/app/containers/Sidebar/ChatBox";
import { adminDb } from "@/firebaseAdmin";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import {
  Grid,
  Box,
  CssBaseline,
  Drawer,
  Toolbar,
  IconButton,
  Divider,
} from "@mui/material";
import { MenuIcon } from "lucide-react";

const drawerWidth = 300;

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

  const url = ref?.data()?.downloadURL;
  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Box
        component={"main"}
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "gray",
          overflow: "auto",
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <PdfViewer url={url} />
          </Grid>
          <Grid item sm={12} xs={12} md={6} lg={6} xl={6}>
            <Chat id={id} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default page;
