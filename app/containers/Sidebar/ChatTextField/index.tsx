import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2Icon } from "lucide-react";
import React, { FormEvent } from "react";

interface ChatTextProps {
  handleSubmit: (e: FormEvent) => void;
  input: string;
  setInput: (e: any) => void;
  isPending: boolean;
}

const ChatText = ({
  handleSubmit,
  input,
  setInput,
  isPending,
}: ChatTextProps) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex sticky bottom-0 space-x-2 p-5 bg-red-600/75"
    >
      <Input
        className="bg-white border border-black text-black"
        placeholder="Ask a question..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button type="submit" disabled={!input || isPending}>
        {isPending ? (
          <Loader2Icon className="animate-spin text-red-600" />
        ) : (
          "Ask"
        )}
      </Button>
    </form>
  );
};

export default ChatText;
