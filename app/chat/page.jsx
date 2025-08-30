"use client";

import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { io } from "socket.io-client";
import axios from "axios";
import { toast } from "sonner";
import Sidebar from "../../components/Sidebar";
import ChatInput from "../../components/ChatInput";
import ChatMessages from "../../components/ChatMessages";
import Cookies from "js-cookie";

export default function ChatPage() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_SERVER_URL);
    setSocket(newSocket);

    newSocket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    verifyTokenAndFetchChats();
  }, []);

  useLayoutEffect(() => {
    const checkScreenSize = () => {
      if (typeof window !== "undefined") {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        setIsSidebarOpen(!mobile);
      }
    };
    checkScreenSize();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", checkScreenSize);
      return () => window.removeEventListener("resize", checkScreenSize);
    }
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const verifyTokenAndFetchChats = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return;
      }
      const res = await axios.get("/api/chat/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChatList(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Token verification failed:", error);
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
  };

  const sendMessage = (content) => {
    if (!socket || !chatId) return;

    const message = {
      id: uuidv4(),
      chatId,
      sender: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, message]);
    socket.emit("sendMessage", message);
  };

  const newChat = async () => {
    try {
      const token = Cookies.get("token");
      const res = await axios.post(
        "/api/chat/new",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const createdChat = res.data;
      setChatList((prev) => [createdChat, ...prev]);
      setChatId(createdChat._id);
      setMessages([]);
      setSelectedChat(createdChat);

      if (typeof window !== "undefined") {
        window.history.pushState({}, "", `/chat`);
      }
    } catch (error) {
      console.error("Failed to create new chat:", error);
      toast.error("Failed to create chat");
    }
  };

  const fetchSpecificChat = async (chatId) => {
    try {
      const token = Cookies.get("token");
      const res = await axios.get(`/api/chat/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessages(res.data.messages);
      setChatId(chatId);
      setSelectedChat(res.data);

      if (typeof window !== "undefined") {
        window.history.pushState({}, "", `/chat/${chatId}`);
      }

      if (isMobile) {
        setIsSidebarOpen(false);
      }
    } catch (error) {
      console.error("Failed to fetch chat:", error);
      toast.error("Failed to fetch chat");
    }
  };

  const handleCopy = async (messageId) => {
    const messageToCopy = messages.find((msg) => msg.id === messageId);
    if (messageToCopy) {
      try {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
          await navigator.clipboard.writeText(messageToCopy.content);
          toast.success("Copied to clipboard");
        }
      } catch (err) {
        console.error("Failed to copy:", err);
        toast.error("Failed to copy message");
      }
    }
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        chatList={chatList}
        onNewChat={newChat}
        onSelectChat={fetchSpecificChat}
        selectedChat={selectedChat}
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isMobile={isMobile}
      />
      <div className="flex flex-1 flex-col">
        <ChatMessages messages={messages} onCopy={handleCopy} />
        <div ref={messagesEndRef} />
        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
}
