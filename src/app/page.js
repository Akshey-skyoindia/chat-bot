"use client"
import BotMessage from "@/components/chat-bot/BotMessage";
import API from "@/components/chat-bot/ChatbotAPI";
import Header from "@/components/chat-bot/Header";
import Input from "@/components/chat-bot/Input";
import Messages from "@/components/chat-bot/Messages";
import UserMessage from "@/components/chat-bot/UserMessage";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    const loadWelcomeMessage = async () => {
      setMessages([
        <BotMessage
          key="0"
          fetchMessage={async () => await API.GetChatbotResponse("hi")}
        />
      ]);
    }
    loadWelcomeMessage();
  }, []);

  const send = async text => {
    const newMessages = messages.concat(
      <UserMessage key={messages.length + 1} text={text} />,
      <BotMessage
        key={messages.length + 2}
        fetchMessage={async () => await API.GetChatbotResponse(text)}
      />
    );
    setMessages(newMessages);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="chatbot">
        <Header />
        <Messages messages={messages} />
        <Input onSend={send} />
      </div>
    </main>

  );
}
