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

  const storedUser =
    localStorage.getItem("user");

  let currentUser = null;

  try {
    currentUser = storedUser
      ? JSON.parse(storedUser)
      : null;
  } catch (err) {
    console.error(
      "Failed to read stored user:",
      err
    );
  }


  // ========================================
  // FETCH MESSAGES
  // ========================================

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await api.get("/api/messages");

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

    const trimmedMessage =
      message.trim();

    if (!trimmedMessage) {
      return;
    }

    try {
      setSending(true);
      setError("");

      const response =
        await api.post("/api/messages", {
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

    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
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

    return new Date(date).toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };


  // ========================================
  // FORMAT DATE
  // ========================================

  const formatDate = (date) => {

    if (!date) {
      return "";
    }

    return new Date(date).toLocaleDateString(
      [],
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };


  // ========================================
  // CHECK CURRENT USER
  // ========================================

  const isCurrentUser = (senderId) => {

    if (!currentUser?.id) {
      return false;
    }

    return Number(senderId) ===
      Number(currentUser.id);
  };


  // ========================================
  // GET PROFILE INITIAL
  // ========================================

  const getInitial = (name) => {

    if (!name) {
      return "?";
    }

    return name
      .trim()
      .charAt(0)
      .toUpperCase();
  };


  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="messages-page">

        <div className="messages-container">

          <div className="messages-loading">

            <div className="messages-loading-icon">
              💬
            </div>

            <h2>
              Loading Messages...
            </h2>

            <p>
              Please wait while we load the
              public conversation.
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

      <div className="messages-container">

        {/* ==================================
            HEADER
        ================================== */}

        <div className="messages-header">

          <div>

            <p className="messages-label">
              Community
            </p>

            <h1>
              Messages
            </h1>

            <p className="messages-description">
              A public space for farmers,
              students and businesses to
              connect and communicate.
            </p>

          </div>

          <div className="messages-header-icon">
            💬
          </div>

        </div>


        {/* ==================================
            ERROR
        ================================== */}

        {error && (
          <div className="messages-error">
            {error}
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
              🌱
            </div>

            <div>

              <h2>
                AgriConnect Community
              </h2>

              <p>
                Public conversation
              </p>

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
                  No messages yet
                </h3>

                <p>
                  Be the first person to
                  start the conversation.
                </p>

              </div>

            ) : (

              <>
                {messages.map((item) => {

                  const mine =
                    isCurrentUser(
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
                        <div className="message-avatar">
                          {getInitial(
                            item.senderName
                          )}
                        </div>
                      )}


                      <div className="message-content">

                        {!mine && (
                          <div className="message-sender">
                            {item.senderName}
                          </div>
                        )}

                        <div className="message-bubble">

                          <p>
                            {item.message}
                          </p>

                        </div>

                        <div className="message-time">

                          {formatDate(
                            item.sentAt
                          )}

                          {" • "}

                          {formatTime(
                            item.sentAt
                          )}

                        </div>

                      </div>


                      {/* OWN USER AVATAR */}

                      {mine && (
                        <div className="message-avatar own-avatar">
                          {getInitial(
                            item.senderName
                          )}
                        </div>
                      )}

                    </div>
                  );
                })}

                <div
                  ref={messagesEndRef}
                />

              </>

            )}

          </div>


          {/* =================================
              MESSAGE INPUT
          ================================= */}

          <form
            className="message-input-area"
            onSubmit={handleSendMessage}
          >

            <textarea
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Write a message..."
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
            >

              {sending
                ? "Sending..."
                : "Send"}

            </button>

          </form>


          {/* =================================
              CHARACTER COUNT
          ================================= */}

          <div className="message-character-count">

            {message.length} / 2000

          </div>

        </div>

      </div>

    </div>
  );
}

export default Messages;