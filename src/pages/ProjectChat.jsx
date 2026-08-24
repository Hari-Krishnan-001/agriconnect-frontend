import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";
import "../styles/projectChat.css";

function ProjectChat() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const messagesEndRef = useRef(null);

  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const [error, setError] = useState("");


  // ========================================
  // LOAD CHAT
  // ========================================

  useEffect(() => {
    loadChat();
  }, [projectId]);


  // ========================================
  // AUTO SCROLL
  // ========================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);


  // ========================================
  // LOAD CHAT + MESSAGES
  // ========================================

  const loadChat = async () => {
    try {
      setLoading(true);
      setError("");

      // ------------------------------------
      // GET / CREATE CHAT
      // ------------------------------------

      const chatResponse = await api.get(
        `/api/project-chats/project/${projectId}`
      );

      setChat(chatResponse.data);


      // ------------------------------------
      // GET MESSAGES
      // ------------------------------------

      const messagesResponse = await api.get(
        `/api/project-chats/project/${projectId}/messages`
      );

      setMessages(
        messagesResponse.data || []
      );

    } catch (err) {
      console.error(
        "Failed to load project chat:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to load this project chat."
      );
    } finally {
      setLoading(false);
    }
  };


  // ========================================
  // SEND MESSAGE
  // ========================================

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const trimmedMessage =
      message.trim();

    if (
      !trimmedMessage ||
      sending
    ) {
      return;
    }

    try {
      setSending(true);
      setError("");

      const response = await api.post(
        `/api/project-chats/project/${projectId}/messages`,
        {
          message: trimmedMessage,
        }
      );

      setMessages((previousMessages) => [
        ...previousMessages,
        response.data,
      ]);

      setMessage("");

    } catch (err) {
      console.error(
        "Failed to send project message:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to send message."
      );
    } finally {
      setSending(false);
    }
  };


  // ========================================
  // GET INITIAL
  // ========================================

  const getInitial = (name) => {
    if (!name) {
      return "U";
    }

    return name
      .charAt(0)
      .toUpperCase();
  };


  // ========================================
  // FORMAT DATE
  // ========================================

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleString(
      "en-IN",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };


  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="project-chat-page">

        <div className="project-chat-loading">

          <div className="project-chat-loading-icon">
            💬
          </div>

          <h2>
            Loading Project Chat...
          </h2>

          <p>
            Please wait while we load the conversation.
          </p>

        </div>

      </div>
    );
  }


  // ========================================
  // ERROR WITHOUT CHAT
  // ========================================

  if (error && !chat) {
    return (
      <div className="project-chat-page">

        <div className="project-chat-container">

          <button
            type="button"
            className="project-chat-back-button"
            onClick={() =>
              navigate(
                `/projects/${projectId}`
              )
            }
          >
            ← Back to Project
          </button>


          <div className="project-chat-error-card">

            <div className="project-chat-error-icon">
              🔒
            </div>

            <h2>
              Unable to Access Project Chat
            </h2>

            <p>
              {error}
            </p>

            <button
              type="button"
              className="project-chat-primary-button"
              onClick={() =>
                navigate(
                  `/projects/${projectId}`
                )
              }
            >
              Go Back
            </button>

          </div>

        </div>

      </div>
    );
  }


  // ========================================
  // MAIN PAGE
  // ========================================

  return (
    <div className="project-chat-page">

      <div className="project-chat-container">


        {/* ==================================
            HEADER
        ================================== */}

        <div className="project-chat-header">

          <button
            type="button"
            className="project-chat-back-button"
            onClick={() =>
              navigate(
                `/projects/${projectId}`
              )
            }
          >
            ← Back to Project
          </button>


          <div className="project-chat-header-info">

            <div className="project-chat-header-icon">
              💬
            </div>

            <div>

              <p className="project-chat-label">
                Project Communication
              </p>

              <h1>
                Project Chat
              </h1>

              <p>
                Project #{projectId}
              </p>

            </div>

          </div>

        </div>


        {/* ==================================
            CHAT CARD
        ================================== */}

        <div className="project-chat-card">


          {/* =================================
              PROJECT / PARTICIPANT INFO
          ================================= */}

          {chat && (
            <div className="project-chat-info">

              <div>

                <span>
                  Project
                </span>

                <strong>
                  {chat.projectTitle ||
                    `Project #${projectId}`}
                </strong>

              </div>


              <div>

                <span>
                  Student
                </span>

                <strong>
                  {chat.studentName ||
                    "Student"}
                </strong>

              </div>


              <div>

                <span>
                  Business
                </span>

                <strong>
                  {chat.businessName ||
                    "Business"}
                </strong>

              </div>

            </div>
          )}


          {/* =================================
              INLINE ERROR
          ================================= */}

          {error && (
            <div className="project-chat-inline-error">
              {error}
            </div>
          )}


          {/* =================================
              MESSAGES
          ================================= */}

          <div className="project-chat-messages">

            {messages.length === 0 ? (

              <div className="project-chat-empty">

                <div className="project-chat-empty-icon">
                  💬
                </div>

                <h3>
                  No messages yet
                </h3>

                <p>
                  Start the conversation about this project.
                </p>

              </div>

            ) : (

              messages.map((item) => (

                <div
                  className="project-chat-message"
                  key={item.id}
                >

                  <div className="project-chat-message-avatar">

                    {getInitial(
                      item.senderName
                    )}

                  </div>


                  <div className="project-chat-message-content">

                    <div className="project-chat-message-top">

                      <strong>
                        {item.senderName ||
                          "User"}
                      </strong>

                      <span>
                        {formatDate(
                          item.sentAt
                        )}
                      </span>

                    </div>


                    <p>
                      {item.message}
                    </p>

                  </div>

                </div>

              ))

            )}

            <div
              ref={messagesEndRef}
            />

          </div>


          {/* =================================
              MESSAGE INPUT
          ================================= */}

          <form
            className="project-chat-input-area"
            onSubmit={handleSendMessage}
          >

            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              disabled={sending}
              maxLength={2000}
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

        </div>

      </div>

    </div>
  );
}

export default ProjectChat;