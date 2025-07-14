import React, { useContext, useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { SocketContext } from "../context/SocketContext";
import "../style/chat.style.css";
import { useAuth } from "../context/auth";
import dayjs from "dayjs";

const Chat = ({ selectedChatUser, showUserProfile, setShowUserProfile }) => {
  const socket = useContext(SocketContext);
  const { data } = useAuth();
  const currentUser = data?.data;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const chatBoxRef = useRef(null);

  // 1️⃣ Socket ulanish va `register`
  useEffect(() => {
    if (!socket.connected) {
      socket.connect(); // endi token bor
    }

    socket.on("connect", () => {
      if (currentUser?.id) {
        socket.emit("register", currentUser.id);
      }
    });

    return () => {
      socket.off("connect");
      socket.disconnect();
    };
  }, [socket, currentUser]);

  // 2️⃣ Online foydalanuvchilarni olish
  useEffect(() => {
    socket.on("users", (userIds) => {
      setOnlineUsers(userIds);
    });

    return () => {
      socket.off("users");
    };
  }, [socket]);

  // 3️⃣ Xabarlar olish (real-time)
  useEffect(() => {
    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, [socket]);

  // typing handle
  const handleTyping = (e) => {
    setMessage(e.target.value);
    if (currentUser && selectedChatUser) {
      socket.emit("typing", {
        senderId: currentUser.id,
        receiverId: selectedChatUser.id,
      });
    }
  };

  // typing emit
  useEffect(() => {
    socket.on("typing", ({ senderId }) => {
      if (selectedChatUser && senderId === selectedChatUser.id) {
        setTypingUser(selectedChatUser.full_name);
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 2000); // 2 soniyadan so‘ng yo‘qoladi
      }
    });

    return () => {
      socket.off("typing");
    };
  }, [selectedChatUser]);

  // 4️⃣ Tanlangan chat uchun tarixni olish
  useEffect(() => {
    if (selectedChatUser && currentUser) {
      socket.emit("get-history", {
        userId: currentUser.id,
        withUserId: selectedChatUser.id,
      });

      socket.on("chat-history", (payload) => {
        setMessages(payload.messages);

        // 🔑 Har doim chat roomga qo‘shil
        socket.emit("join-room", `chat_${payload.chatId}`);
      });

      return () => {
        socket.off("chat-history");
      };
    }
  }, [selectedChatUser, currentUser]);

  // 5️⃣ Chat oynasini avtomatik pastga skroll qilish
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // 6️⃣ Xabar yuborish
  const sendMessage = () => {
    if (message.trim() && currentUser && selectedChatUser) {
      const senderId = currentUser.id;
      const receiverId = selectedChatUser.id;
      console.log(senderId, receiverId);

      socket.emit("send-message", { senderId, receiverId, text: message });

      setMessage("");
    }
  };

  const onEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const isUserOnline =
    selectedChatUser && onlineUsers.includes(selectedChatUser.id);

  // --------------------------------------------------------  //
  return (
    <div className={`chat-container ${!showUserProfile ? "full" : ""}`}>
      {selectedChatUser ? (
        <>
          {/* chat container header */}
          <div className="chat-header">
            {/* user avatar */}
            <div className="user-avatar-container">
              <img
                className="header-user-avatar"
                src={selectedChatUser.avatar_uri}
                alt="user"
                onClick={() => setShowUserProfile(true)}
              />
            </div>

            <div className="name-status-container">
              {/* user full name */}
              <h3>{selectedChatUser.full_name}</h3>
              {/* status */}
              <span className={isUserOnline ? "online" : "offline"}>
                {isTyping && typingUser
                  ? "yozmoqda..."
                  : isUserOnline
                  ? "online"
                  : "offline"}
              </span>
            </div>
          </div>

          <div className="chat-box" ref={chatBoxRef}>
            {messages.map((msg, index) => {
              const isOwnMessage = msg.senderId === currentUser?.id;
              const avatar = isOwnMessage
                ? currentUser?.avatar_uri
                : selectedChatUser?.avatar_uri;

              return (
                <div
                  key={index}
                  className="message-container"
                  style={{
                    flexDirection: isOwnMessage ? "row-reverse" : "row",
                  }}
                >
                  <img src={avatar} alt="avatar" className="message-avatar" />
                  <div
                    className={isOwnMessage ? "user-message" : "server-message"}
                  >
                    <div>{msg.text}</div>
                    <div className="timestamp">
                      {dayjs(msg.createdAt).format("HH:mm")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="chat-input-container">
            {/* message input */}
            <textarea
              value={message}
              onChange={handleTyping}
              onKeyDown={(e) => {
                if (e.ctrlKey && e.key === "Enter") {
                  sendMessage();
                }
              }}
              onFocus={() => setShowEmoji(false)}
              placeholder="Xabar yozing..."
              className="chat-input"
              rows="1.5"
            />

            {/* emojis */}
            <button
              type="button"
              className="emoji-button"
              onClick={() => setShowEmoji((prev) => !prev)}
            >
              😊
            </button>

            {/* push */}
            <button onClick={sendMessage} className="chat-button">
              🚀
            </button>

            {showEmoji && (
              <div
                style={{
                  position: "absolute",
                  bottom: "60px",
                  right: "10px",
                  zIndex: 10,
                }}
              >
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="empty-chat-state">
          <img
            src="buble1-Photoroom.png"
            alt="default chat icon"
            className="default-chat-icon"
          />
          <h2>Kim bilandir gaplashamizmi? 😄</h2>
        </div>
      )}
    </div>
  );
};

export default Chat;
