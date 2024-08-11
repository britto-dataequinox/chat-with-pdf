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
          prev.slice(0, prev.length - 1).concat([
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
    bottomChatRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (!snapshot) return;

    const lastMessage = messages.pop();

    if (lastMessage?.role === "ai" && lastMessage.message === "Thinking...") {
      return;
    }

    const newMessages = snapshot.docs.map((doc) => {
      const { role, message, createdAt } = doc.data();

      return {
        id: doc.id,
        role,
        message,
        createdAt: createdAt.toDate(),
      };
    });

    setMessages(newMessages);
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
        return title.slice(0, newIndex);
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
        mb: isMobile ? -8 : 0,
        mt: isMobile ? 2 : 0,
      }}
    >
      <Box sx={{ display: isMobile ? "block" : "flex", mb: 2 }}>
        <IconButton
          onClick={() => setIsOpen((prev) => !prev)}
          sx={{
            position: "relative",
            backgroundColor: "red",
            color: "white",
            borderRadius: "50%",
            mb: 2,
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.1)",
              background: "darkred",
            },
            "@media (max-width: 600px)": {
              bottom: 15,
              right: 15,
            },
          }}
        >
          <ChatIcon />
        </IconButton>
        {!isMobile && (
          <Typography
            variant={"inherit"}
            sx={{
              color: "red",
              fontWeight: "bold",
              px: 2,
              fontSize: "12px",
              letterSpacing: 2,
              textTransform: "uppercase",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              animation: `fadeIn 0.5s ease-in-out`,
              "@keyframes fadeIn": {
                from: {
                  opacity: 0,
                  transform: "translateY(-20px)",
                },
                to: {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              },
            }}
          >
            {currentText}
          </Typography>
        )}
      </Box>

      {/* Render chat as a card for desktop */}
      {(!isMobile || isOpen) && (
        <Card
          sx={{
            width: isMobile ? "325px" : "450px",
            mt: 2,
            maxWidth: "800px",
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
          {isMobile && (
            <IconButton
              onClick={() => setIsOpen(false)}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                color: "black",
                fontWeight: "bold",
                zIndex: 1000,
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
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
      )}
    </Box>
  );
};

export default Chat;
