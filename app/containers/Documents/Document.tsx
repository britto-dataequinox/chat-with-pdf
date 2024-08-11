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
import { Typography } from "@mui/material";

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
    <div>
      <div className="flex flex-col w-64 h-80 rounded-xl bg-white drop-shadow-md justify-between p-4 transition-all transform hover:scale-105 hover:bg-red-600 hover:text-white cursor-pointer group">
        <div
          onClick={() => router.push(`/dashboard/files/${id}`)}
          className="flex-1"
        >
          <p className="font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap">
            {name}
          </p>

          <p className="text-sm text-gray-500 group-hover:text-red-100">
            {byteSize(size).value} KB
          </p>
          {/* PDF Thumbnail */}
          <div className="mt-2">
            <PdfThumbnail />
          </div>
        </div>
        <div className="flex space-x-2 justify-end">
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
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="font-semibold">
              Are you sure you want to delete this document?
            </h2>
            <div className="flex space-x-2 mt-4">
              <Button onClick={handleDelete}>Yes</Button>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                No
              </Button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Document;
