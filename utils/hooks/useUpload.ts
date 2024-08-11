"use client";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { Status, StatusText } from "../types/status";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { db, storage } from "@/firebase";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { generateEmbeddings } from "@/api/generateEmbeddings";

const useUpload = () => {
  const [progress, setProgress] = useState<number | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const { user } = useUser();
  const router = useRouter();

  const handleUpload = async (file: File) => {
    if (!file || !user) return;

    // TODO: For free users limit to upload pdf

    const fileIdToUploadTo = uuidv4();
    const storageRef: any = ref(
      storage,
      `users/${user.id}/files/${fileIdToUploadTo}`,
    );

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        setStatus(StatusText.UPLOADING);
        setProgress(percent);
      },
      (error: any) => {
        // add error as a toast message here
        throw new Error(error);
      },
      async () => {
        setStatus(StatusText.UPLOADED);

        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        setStatus(StatusText.SAVING);
        await setDoc(doc(db, "users", user.id, "files", fileIdToUploadTo), {
          name: file.name,
          size: file.size,
          type: file.type,
          downloadURL: downloadURL,
          ref: uploadTask.snapshot.ref.fullPath,
          createdAt: new Date(),
        });

        setStatus(StatusText.GENERATING);
        await generateEmbeddings(fileIdToUploadTo);

        setFileId(fileIdToUploadTo);
      },
    );
  };

  return {
    progress,
    status,
    fileId,
    handleUpload,
  };
};

export default useUpload;
