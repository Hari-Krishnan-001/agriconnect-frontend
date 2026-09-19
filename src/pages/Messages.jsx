import { useEffect, useState, useRef } from "react";
import api from "../services/api";
import "../styles/messages.css";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const [error, setError] = useState("");

  const messagesEndRef = useRef(null);

  // ========================================
  // GET CURRENT USER
  // ========================================

  const storedUser = localStorage.getItem("user");

  let currentUser = null;

  try {
    currentUser = storedUser ? JSON.parse(storedUser) : null;
  } catch (err) {
    console.error("Failed to read stored user:", err);
  }

  // ========================================
  // FETCH MESSAGES
  // ========================================

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/messages");

      setMessages(response.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to load messages."
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // INITIAL LOAD
  // ========================================

  useEffect(() => {
    fetchMessages();
  }, []);

  // ========================================
  // SCROLL TO BOTTOM
  // ========================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // ========================================
  // SEND MESSAGE
  // ========================================

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    try {
      setSending(true);
      setError("");

      const response = await api.post("/api/messages", {
        message: trimmedMessage,
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        response.data,
      ]);

      setMessage("");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to send message."
      );
    } finally {
      setSending(false);
    }
  };

  // ========================================
  // HANDLE ENTER KEY
  // ========================================

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  // ========================================
  // FORMAT TIME
  // ========================================

  const formatTime = (date) => {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ========================================
  // FORMAT DATE
  // ========================================

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleDateString([], {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // ========================================
  // CHECK CURRENT USER
  // ========================================

  const isCurrentUser = (senderId) => {
    if (!currentUser?.id) {
      return false;
    }

    return Number(senderId) === Number(currentUser.id);
  };

  // ========================================
  // GET PROFILE INITIAL
  // ========================================

  const getInitial = (name) => {
    if (!name) {
      return "?";
    }

    return name.trim().charAt(0).toUpperCase();
  };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="messages-page">
        <div className="messages-background-decoration messages-decoration-one" />
        <div className="messages-background-decoration messages-decoration-two" />

        <div className="messages-container">
          <div className="messages-loading">
            <div className="messages-loading-icon">
              🌱
            </div>

            <h2>Loading Community</h2>

            <p>
              Please wait while we load the
              conversation.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // PAGE
  // ========================================

  return (
    <div className="messages-page">

      {/* Decorative background */}
      <div className="messages-background-decoration messages-decoration-one" />
      <div className="messages-background-decoration messages-decoration-two" />

      <div className="messages-container">

        {/* ==================================
            PAGE HEADER
        ================================== */}

        <div className="messages-header">

          <div className="messages-header-left">

            <div className="messages-brand-icon">
              🌱
            </div>

            <div>
              <p className="messages-label">
                AGRILINK COMMUNITY
              </p>

              <h1>
                Community Messages
              </h1>

              <p className="messages-description">
                Connect, communicate and share
                agricultural opportunities with
                farmers, students and businesses.
              </p>
            </div>

          </div>

          <div className="messages-header-badge">
            <span className="messages-online-dot" />
            Community
          </div>

        </div>

        {/* ==================================
            ERROR
        ================================== */}

        {error && (
          <div className="messages-error">
            <span className="messages-error-icon">
              !
            </span>

            <span>{error}</span>
          </div>
        )}

        {/* ==================================
            CHAT CARD
        ================================== */}

        <div className="messages-card">

          {/* =================================
              CHAT HEADER
          ================================= */}

          <div className="messages-card-header">

            <div className="messages-community-avatar">
              <span>🌱</span>
            </div>

            <div className="messages-community-info">
              <div className="messages-community-title">
                <h2>
                  AgriLink Community
                </h2>

                <span className="messages-live-badge">
                  LIVE
                </span>
              </div>

              <p>
                Public agricultural conversation
              </p>
            </div>

            <div className="messages-member-icon">
              👥
            </div>

          </div>

          {/* =================================
              MESSAGE AREA
          ================================= */}

          <div className="messages-list">

            {messages.length === 0 ? (

              <div className="messages-empty">

                <div className="messages-empty-icon">
                  💬
                </div>

                <h3>
                  Start the conversation
                </h3>

                <p>
                  No messages yet. Be the first
                  to share something with the
                  AgriLink community.
                </p>

                <div className="messages-empty-hint">
                  🌾 Share ideas • Ask questions •
                  Grow together
                </div>

              </div>

            ) : (

              <>

                <div className="messages-date-divider">
                  <span>Community conversation</span>
                </div>

                {messages.map((item) => {

                  const mine = isCurrentUser(
                    item.senderId
                  );

                  return (
                    <div
                      key={item.id}
                      className={`message-row ${
                        mine
                          ? "message-row-own"
                          : "message-row-other"
                      }`}
                    >

                      {/* OTHER USER AVATAR */}

                      {!mine && (
                        <div className="message-avatar-wrapper">

                          <div className="message-avatar">
                            {getInitial(
                              item.senderName
                            )}
                          </div>

                        </div>
                      )}

                      <div className="message-content">

                        {!mine && (
                          <div className="message-sender">
                            {item.senderName || "Community Member"}
                          </div>
                        )}

                        <div className="message-bubble">

                          <p>
                            {item.message}
                          </p>

                        </div>

                        <div className="message-time">

                          <span>
                            {formatDate(
                              item.sentAt
                            )}
                          </span>

                          <span className="message-time-dot">
                            •
                          </span>

                          <span>
                            {formatTime(
                              item.sentAt
                            )}
                          </span>

                        </div>

                      </div>

                      {/* OWN USER AVATAR */}

                      {mine && (
                        <div className="message-avatar-wrapper">

                          <div className="message-avatar own-avatar">
                            {getInitial(
                              item.senderName
                            )}
                          </div>

                        </div>
                      )}

                    </div>
                  );
                })}

                <div ref={messagesEndRef} />

              </>

            )}

          </div>

          {/* =================================
              MESSAGE INPUT
          ================================= */}

          <div className="message-composer-wrapper">

            <form
              className="message-input-area"
              onSubmit={handleSendMessage}
            >

              <div className="message-input-icon">
                💬
              </div>

              <textarea
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Write something for the community..."
                maxLength={2000}
                disabled={sending}
                rows={1}
              />

              <button
                type="submit"
                disabled={
                  sending ||
                  !message.trim()
                }
                aria-label="Send message"
              >

                {sending ? (
                  <span className="send-loading">
                    <span />
                    <span />
                    <span />
                  </span>
                ) : (
                  <>
                    <span>Send</span>
                    <span className="send-arrow">
                      ↑
                    </span>
                  </>
                )}

              </button>

            </form>

            <div className="message-composer-footer">

              <span>
                Press <strong>Enter</strong> to send
              </span>

              <span className="message-character-count">
                {message.length} / 2000
              </span>

            </div>

          </div>

        </div>

        {/* ==================================
            FOOTER MESSAGE
        ================================== */}

        <div className="messages-page-footer">
          <span>🌾</span>
          <span>
            Connecting people. Growing opportunities.
          </span>
          <span>🌿</span>
        </div>

      </div>
    </div>
  );
}

export default Messages;