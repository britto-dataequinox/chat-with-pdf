"use server";

import { adminDb } from "@/firebaseAdmin";
import { generateLangChainCompletion } from "@/lib/langchain";
import { Message } from "@/utils/types/message";
import { auth } from "@clerk/nextjs/server";

const MAX_TOKENS = 200;

const askQuestion = async (id: string, question: string) => {
  auth().protect();
  const { userId } = await auth();

  const chatRef = adminDb
    .collection("users")
    .doc(userId!)
    .collection("files")
    .doc(id)
    .collection("chat");

  const chatSnapshot = await chatRef.get();

  const useMessages = chatSnapshot.docs.filter(
    (doc) => doc.data().role === "human",
  );

  const userMessage: Message = {
    role: "human",
    message: question,
    createdAt: new Date(),
  };

  await chatRef.add(userMessage);

  // Limit tokens
  const questionTokens = question.split(" ").length; // Simple tokenization based on spaces
  if (questionTokens > MAX_TOKENS) {
    return {
      success: false,
      message: `Question exceeds the maximum limit of ${MAX_TOKENS} tokens.`,
    };
  }

  const reply = await generateLangChainCompletion(id, question);

  const aiMessage: Message = {
    role: "ai",
    message: reply,
    createdAt: new Date(),
  };

  await chatRef.add(aiMessage);

  return { success: true, message: null };
};

export default askQuestion;
