"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import byteSize from "byte-size";
import { Button } from "@/components/ui/button";
import { DownloadCloud, Trash2 } from "lucide-react";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "@/firebase";
import { deleteObject, ref } from "firebase/storage";
import deleteDocument from "@/api/deleteDocument";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PdfThumbnail from "./PdfThumbnail";
import userSubscription from "@/utils/hooks/userSubscription";
import { Box, Typography } from "@mui/material";
import ConfirmationModal from "../ConfirmModal";

const Document = ({
  id,
  name,
  size,
  downloadUrl,
}: {
  id: string;
  name: string;
  size: number;
  downloadUrl: string;
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isOverFileLimit } = userSubscription();

  const handleDelete = async () => {
    try {
      await deleteDocument(id);
      toast.success("Document deleted successfully!");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to delete document");
    }
  };

  return (
    <Box>
      <Box className="flex flex-col w-64 h-80 rounded-xl bg-white drop-shadow-md justify-between p-4 transition-all transform hover:scale-105 hover:bg-red-600 hover:text-white cursor-pointer group">
        <Box
          onClick={() => router.push(`/dashboard/files/${id}`)}
          className="flex-1"
        >
          <Typography className="font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap">
            {name}
          </Typography>

          <Typography className="text-sm text-gray-500 group-hover:text-red-100">
            {byteSize(size).value} KB
          </Typography>
          {/* PDF Thumbnail */}
          <Box className="mt-2">
            <PdfThumbnail />
          </Box>
        </Box>
        <Box className="flex space-x-2 justify-end">
          <Button variant={"outline"} asChild>
            <a href={downloadUrl} download>
              <DownloadCloud className="h-6 w-6 text-red-600" />
            </a>
          </Button>
          {isOverFileLimit ? (
            <Button
              disabled
              variant={"outline"}
              onClick={() => setIsModalOpen(true)}
            >
              <Trash2 className="h-6 w-6 text-red-600" />
              <Typography
                variant="inherit"
                color="black"
                style={{ marginLeft: 8 }}
              >
                Pro Feature
              </Typography>
            </Button>
          ) : (
            <Button variant={"outline"} onClick={() => setIsModalOpen(true)}>
              <Trash2 className="h-6 w-6 text-red-600" />
            </Button>
          )}
        </Box>
      </Box>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <ConfirmationModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDelete}
          title="Are you sure you wan't to delete this document ?"
        />
      )}

      <ToastContainer />
    </Box>
  );
};

export default Document;
