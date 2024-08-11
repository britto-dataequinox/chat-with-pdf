"use client";

import { Message } from "@/utils/types/message";
import { useUser } from "@clerk/nextjs";
import { BotIcon, Loader2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";
import Markdown from "react-markdown";
import AiBotImage from "@/public/aibot.jpg";
import { Box, Grid } from "@mui/material";

interface BotMessageType {
  key?: string | number;
  message: Message;
}

const BotMessage = ({ message }: BotMessageType) => {
  const isHuman = message.role === "human";
  const { user } = useUser();
  return (
    <Grid
      container
      justifyContent={isHuman ? "flex-end" : "flex-start"}
      sx={{ marginY: 1, mt: 8 }}
    >
      <Grid item>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          className="chat-image avatar"
        >
          {isHuman ? (
            user?.imageUrl && (
              <Image
                src={user?.imageUrl}
                alt="Profile Pic"
                width={40}
                height={40}
                className="rounded-full"
              />
            )
          ) : (
            <Box
              className="h-10 w-10 rounded-full mx-2"
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{ backgroundColor: "red", borderRadius: "50%" }}
            >
              <Image
                src={AiBotImage}
                alt="Bot Image"
                width={40}
                height={40}
                className="rounded-full"
              />
            </Box>
          )}
        </Box>
      </Grid>
      <Grid item>
        <Box
          className="chat-bubble prose p-4 rounded-xl max-w-xs mx-2"
          sx={{
            background: isHuman
              ? "linear-gradient(135deg, #FF0000, #FFFFFF)"
              : "linear-gradient(135deg, #E0E0E0, #FFFFFF)",
            color: isHuman ? "white" : "black",
            marginLeft: isHuman ? "10px" : "0",
            marginRight: isHuman ? "0" : "10px",
          }}
        >
          {message.message === "Thinking..." ? (
            <Box display="flex" alignItems="center" justifyContent="center">
              <Loader2Icon className="animate-spin h-5 w-5 text-white" />
            </Box>
          ) : (
            <Markdown>{message.message}</Markdown>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default BotMessage;
