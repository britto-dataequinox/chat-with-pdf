"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  CheckCircle,
  CircleArrowDown,
  HammerIcon,
  RocketIcon,
  SaveIcon,
} from "lucide-react";
import { toast } from "react-toastify";
import useUpload from "@/utils/hooks/useUpload";
import { useRouter } from "next/navigation";
import { StatusText } from "@/utils/types/status";
import { Alert, Box, Snackbar, Typography } from "@mui/material";

const FileUploader = () => {
  const { progress, status, fileId, handleUpload, uploadCount }: any =
    useUpload();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (fileId) {
      router.push(`/dashboard/files/${fileId}`);
    }
  }, [fileId, router]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file) {
        // Check file size (250 KB = 250 * 1024 bytes)
        if (file.size > 250 * 1024) {
          setErrorMessage(
            "File size exceeds 250 KB. Please upload a smaller file.",
          );
          setOpen(true);
          return;
        }

        await handleUpload(file);
      } else {
        toast.error("No file selected. Please try again.");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [uploadCount],
  );

  const handleClose = () => {
    setOpen(false);
  };

  const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      accept: {
        "application/pdf": [".pdf"],
      },
    });

  const uploadInProgress =
    progress !== null && progress >= 0 && progress <= 100;

  const statusIcons: {
    [key in StatusText]: JSX.Element;
  } = {
    [StatusText.UPLOADING]: <RocketIcon className="h-20 w-20 text-red-600" />,
    [StatusText.UPLOADED]: <CheckCircle className="h-20 w-20 text-red-600" />,
    [StatusText.SAVING]: <SaveIcon className="h-20 w-20 text-red-600" />,
    [StatusText.GENERATING]: <HammerIcon className="h-20 w-20 text-red-600" />,
  };

  return (
    <Box className="flex flex-col gap-4 items-center max-w-7xl mx-auto">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      {uploadInProgress && (
        <Box className="flex flex-col gap-4 items-center max-w-7xl mx-auto">
          <Box
            className={`radial-progress bg-red-300 text-white border-red-600 border-4 
          ${progress === 100 && "hidden"}`}
            role="progressbar"
            style={
              {
                "--value": progress,
                "--size": "12rem",
                "--thickness": "2px",
              } as React.CSSProperties
            }
          >
            {progress} %
          </Box>
          {status && status in statusIcons
            ? statusIcons[status as keyof typeof statusIcons]
            : null}
          <Typography className="text-red-600 animate-pulse">
            {status}
          </Typography>
        </Box>
      )}
      {!uploadInProgress && (
        <Box
          {...getRootProps()}
          className={`p-10 border-dashed border-4 border-red-600 mt-10 w-full text-red-600 rounded-lg h-96 flex items-center justify-center ${
            isFocused || isDragAccept ? "bg-red-300" : "bg-red-100"
          }`}
        >
          <input {...getInputProps()} />
          <Box className="flex flex-col items-center justify-center mt-4">
            {isDragActive ? (
              <>
                <RocketIcon className="h-20 w-20 animate-ping" />
                <Typography>Drop the files here ...</Typography>
              </>
            ) : (
              <>
                <CircleArrowDown className="h-20 w-20 animate-bounce" />
                <Typography>
                  Drag 'n' drop some files here, or click to select files
                </Typography>
              </>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FileUploader;
