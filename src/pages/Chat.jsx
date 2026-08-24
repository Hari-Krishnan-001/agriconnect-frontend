import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";
import "../styles/chat.css";

function Chat() {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const messagesEndRef = useRef(null);

  // ==========================================
  // LOAD CHAT
  // ==========================================

  useEffect(() => {
    loadChat();
  }, [orderId]);

  const loadChat = async () => {
    try {
      setLoading(true);
      setError("");

      const chatResponse = await api.get(
        `/api/chats/order/${orderId}`
      );

      setChat(chatResponse.data);

      const messagesResponse = await api.get(
        `/api/chats/order/${orderId}/messages`
      );

      setMessages(messagesResponse.data || []);
    } catch (err) {
      console.error("Failed to load chat:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load this chat."
      );
    } finally {
      setLoading(false);
    }
  };


  // ==========================================
  // AUTO SCROLL
  // ==========================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);


  // ==========================================
  // SEND MESSAGE
  // ==========================================

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || sending) {
      return;
    }

    try {
      setSending(true);
      setError("");

      const response = await api.post(
        `/api/chats/order/${orderId}/messages`,
        {
          message: trimmedMessage,
        }
      );

      setMessages((prevMessages) => [
        ...prevMessages,
        response.data,
      ]);

      setMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);

      setError(
        err.response?.data?.message ||
          "Failed to send message."
      );
    } finally {
      setSending(false);
    }
  };


  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatMessageTime = (sentAt) => {
    if (!sentAt) {
      return "";
    }

    return new Date(sentAt).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };


  // ==========================================
  // GET MESSAGE INITIAL
  // ==========================================

  const getInitial = (name) => {
    return (
      name?.charAt(0)?.toUpperCase() || "U"
    );
  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="chat-page">

        <div className="chat-container">

          <div className="chat-loading">

            <div className="chat-loading-icon">
              💬
            </div>

            <h2>
              Loading Chat...
            </h2>

            <p>
              Please wait while we load your conversation.
            </p>

          </div>

        </div>

      </div>
    );
  }


  // ==========================================
  // ACCESS ERROR
  // ==========================================

  if (error && !chat) {
    return (
      <div className="chat-page">

        <div className="chat-container">

          <button
            type="button"
            className="chat-back-button"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

          <div className="chat-error-card">

            <div className="chat-error-icon">
              🔒
            </div>

            <h2>
              Unable to Access Chat
            </h2>

            <p>
              {error}
            </p>

            <button
              type="button"
              className="chat-primary-button"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>

          </div>

        </div>

      </div>
    );
  }


  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="chat-page">

      <div className="chat-container">

        {/* ==================================
            BACK
        ================================== */}

        <button
          type="button"
          className="chat-back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>


        {/* ==================================
            CHAT HEADER
        ================================== */}

        <div className="chat-header">

          <div className="chat-header-left">

            <div className="chat-header-icon">
              💬
            </div>

            <div className="chat-header-text">

              <p className="chat-header-label">
                ORDER CHAT
              </p>

              <h1>
                Order #{orderId}
              </h1>

              <p className="chat-header-subtitle">
                Private conversation between farmer
                and business
              </p>

            </div>

          </div>

        </div>


        {/* ==================================
            CHAT CARD
        ================================== */}

        <div className="chat-card">


          {/* ==================================
              ORDER INFORMATION
          ================================== */}

          {chat && (

            <div className="chat-order-info">

              <div className="chat-order-item">

                <span>
                  Crop
                </span>

                <strong>
                  🌱 {chat.cropName || "Unknown"}
                </strong>

              </div>


              <div className="chat-order-item">

                <span>
                  Farmer
                </span>

                <strong>
                  {chat.farmerName || "Unknown"}
                </strong>

              </div>


              <div className="chat-order-item">

                <span>
                  Business
                </span>

                <strong>
                  {chat.businessName || "Unknown"}
                </strong>

              </div>

            </div>

          )}


          {/* ==================================
              INLINE ERROR
          ================================== */}

          {error && (

            <div className="chat-inline-error">
              {error}
            </div>

          )}


          {/* ==================================
              MESSAGES
          ================================== */}

          <div className="chat-messages">

            {messages.length === 0 ? (

              <div className="chat-empty">

                <div className="chat-empty-icon">
                  💬
                </div>

                <h3>
                  No messages yet
                </h3>

                <p>
                  Start the conversation about
                  this order.
                </p>

              </div>

            ) : (

              messages.map((item) => (

                <div
                  className="chat-message"
                  key={item.id}
                >

                  {/* Avatar */}

                  <div className="chat-message-avatar">

                    {getInitial(
                      item.senderName
                    )}

                  </div>


                  {/* Message */}

                  <div className="chat-message-content">

                    <div className="chat-message-top">

                      <strong>
                        {item.senderName ||
                          "User"}
                      </strong>

                      <span>
                        {formatMessageTime(
                          item.sentAt
                        )}
                      </span>

                    </div>

                    <div className="chat-message-bubble">

                      {item.message}

                    </div>

                  </div>

                </div>

              ))

            )}

            {/* Auto-scroll target */}

            <div ref={messagesEndRef} />

          </div>


          {/* ==================================
              MESSAGE INPUT
          ================================== */}

          <form
            className="chat-input-area"
            onSubmit={handleSendMessage}
          >

            <input
              type="text"
              value={message}
              placeholder="Type a message about this order..."
              onChange={(e) =>
                setMessage(e.target.value)
              }
              disabled={sending}
              maxLength={1000}
              autoComplete="off"
            />

            <button
              type="submit"
              disabled={
                sending ||
                !message.trim()
              }
            >

              {sending
                ? "Sending..."
                : "Send"}

            </button>

          </form>


          {/* Character count */}

          <div className="chat-input-footer">

            <span>
              Private order conversation
            </span>

            <span>
              {message.length}/1000
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Chat;