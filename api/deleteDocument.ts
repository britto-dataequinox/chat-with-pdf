"use server";

import { adminDb, adminStorage } from "@/firebaseAdmin";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import pc from "@/lib/pinecone";
import { indexName } from "@/lib/langchain";

const deleteDocument = async (docId: string) => {
  auth().protect();

  const { userId } = await auth();

  await adminDb
    .collection("users")
    .doc(userId!)
    .collection("files")
    .doc(docId)
    .delete();

  await adminStorage
    .bucket(process.env.FIREBASE_STORAGE_BUCKET)
    .file(`users/${userId}/files/${docId}`)
    .delete();

  const index = await pc.index(indexName);
  await index.namespace(docId).deleteAll();

  revalidatePath("/dashboard");
};

export default deleteDocument;
