"use client";

import React, {
  useState,
  useTransition,
  FormEvent,
  useEffect,
  useRef,
} from "react";
import ChatText from "../ChatTextField";
import { useUser } from "@clerk/nextjs";
import { Message } from "@/utils/types/message";
import {
  Box,
  Grid,
  CircularProgress,
  Card,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import askQuestion from "@/api/askQuestions";
import BotMessage from "../BotMessage";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";

const Chat = ({ id }: { id: string }) => {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPending, startTransition] = useTransition();
  const bottomChatRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false); // State for chat visibility

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const q = input;
    setInput("");

    setMessages((prev) => [
      ...prev,
      {
        role: "human",
        message: q,
        createdAt: new Date(),
      },
      {
        role: "ai",
        message: "Thinking...",
        createdAt: new Date(),
      },
    ]);

    startTransition(async () => {
      const { success, message } = await askQuestion(id, q);

      if (!success) {
        setMessages((prev) =>
          prev?.slice(0, prev.length - 1)?.concat([
            {
              role: "ai",
              message: `Whoops... ${message}`,
              createdAt: new Date(),
            },
          ]),
        );
      }
    });
  };

  const [snapshot, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user?.id, "files", id, "chat"),
        orderBy("createdAt", "asc"),
      ),
  );

  useEffect(() => {
    bottomChatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    if (!snapshot) return;

    const lastMessage = messages.pop();

    if (lastMessage?.role === "ai" && lastMessage.message === "Thinking...") {
      return;
    }

    const newMessages = snapshot?.docs?.map((doc) => {
      const { role, message, createdAt } = doc?.data();

      return {
        id: doc?.id,
        role,
        message,
        createdAt: createdAt?.toDate(),
      };
    });

    setMessages(newMessages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snapshot]);

  const title =
    "Ask me anything about your document and I will help you to solve your doubts.";
  const [currentText, setCurrentText] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentText((prevText) => {
        const newIndex = (prevText.length + 1) % (title.length + 1);
        return title?.slice(0, newIndex);
      });
    }, 200);

    return () => clearInterval(intervalId);
  }, [title]);

  return (
    <Box
      sx={{
        zIndex: 999,
        px: 4,
        py: 4,
      }}
    >
      {/* Render chat as a card for desktop */}
      <Card
        sx={{
          mt: 2,
          height: "75vh",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(to bottom, red, rgba(255, 0, 0, 0.7))",
          borderRadius: 2,
          boxShadow: 3,
          position: "relative",
          overflow: "hidden", // Hide scrollbars on Card
        }}
      >
        <Box display="flex" flexDirection="column" height="100%">
          <Grid
            container
            direction="column"
            flexGrow={1}
            sx={{ overflowY: "auto", p: 2 }}
          >
            <Grid
              item
              flexGrow={1}
              sx={{
                flexDirection: "column",
                display: "flex",
                maxHeight: "100%",
              }}
            >
              {loading ? (
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  sx={{ height: "100%" }}
                >
                  <CircularProgress color="secondary" size={80} />
                </Grid>
              ) : messages.length === 0 ? (
                <BotMessage
                  key={"placeholder"}
                  message={{
                    role: "ai",
                    message: "Ask me anything about the document!",
                    createdAt: new Date(),
                  }}
                />
              ) : (
                messages.map((message, index) => (
                  <BotMessage key={index} message={message} />
                ))
              )}
              <div ref={bottomChatRef} />
            </Grid>
          </Grid>
          <Box
            sx={{
              p: 2,
              background: "rgba(255, 255, 255, 0.1)",
              position: "sticky",
              bottom: 0,
            }}
          >
            <ChatText
              handleSubmit={handleSubmit}
              input={input}
              setInput={setInput}
              isPending={isPending}
            />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default Chat;
