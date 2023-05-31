import React, { useState, useRef, useEffect } from "react";
import styles from "./Chatbot.module.css";
import Link from "next/link";

const Chatbot = () => {
  const [showChat, setShowChat] = useState(false);
  const messageInputRef = useRef();
  const [allMessages, setAllMessages] = useState([]);
  const [messagesList, setMessagesList] = useState([]);
  const [sendEndpoint, setSendEndpoint] = useState("send-fresh");

  useEffect(() => {
    const messagesElements = allMessages.map((msg, index) => {
      if (msg[1] == "user") {
        return (
          <div className={styles.messageCloudSent}>
            <div className={styles.message + " " + styles.sent}>
              {msg[0]}
            </div>
          </div>
        );
      } else {
        return (
          <div className={styles.messageCloudReceived}>
            <img
              className={styles["chatbot-img"]}
              src="/icons8-chatbot.png"
              alt="message chatbot icon"
              width={50}
              height={50}
            />
            <div className={styles.message + " " + styles.received}>
              {msg[0]}
            </div>
          </div>
        );
      }
    });
    setMessagesList(messagesElements);
  }, [allMessages]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessageHandler(event);
    }
  };

  const sendMessageHandler = (event) => {
    event.preventDefault();
    const enteredText = messageInputRef.current.value;
    if (enteredText.trim().length === 0) {
      console.log("Empty message");
      return;
    }
    messageInputRef.current.value = " ";

    fetch(`http://127.0.0.1:5000/${sendEndpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: enteredText, sender: "user" }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success from index:", data);
        handleLoadMessages();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setSendEndpoint("send");
  };

  const handleChangeContext = () => {
    setSendEndpoint("send-fresh");
    setAllMessages([]);
    fetch("http://127.0.0.1:5000/fresh-conversation")
      .then((response) => response.json())
      .then((data) => {
        // handleMessages(data.messages);
        console.log(data.status);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // TODO - handle links as html elements
  const handleMessages = (messages) => {
    let answer = messages[messages.length - 1];
    let start_index = answer.indexOf("http");
    let link = answer.slice(start_index);

    messages[messages.length - 1] = answer.slice(0, start_index);
    messages.push(<Link href={link}>link</Link>);
    setAllMessages(messages);
  };

  const handleLoadMessages = () => {
    fetch("http://127.0.0.1:5000/receive")
      .then((response) => response.json())
      .then((data) => {
        // handleMessages(data.messages);
        setAllMessages(data.messages);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleToggle = () => {
    handleLoadMessages();
    setShowChat(!showChat);
  };

  return (
    <>
      <div className={styles.chatbot}>
        {showChat && (
          <div className={styles.container}>
            <div className={styles.messageContainer}>{messagesList}</div>
            <div className={styles.containerBottom}>
              <button className={styles.button} onClick={handleChangeContext}>
                Zmień temat rozmowy
              </button>
              <div className={styles.inputContainer}>
                <input
                  className={styles.input}
                  type="text"
                  onKeyUp={handleKeyPress}
                  ref={messageInputRef}
                  placeholder="Zadaj mi pytanie :)"
                />
                <button className={styles.button} onClick={sendMessageHandler}>
                  <img
                    src="/icons8-send.png"
                    alt="send icon"
                    width="25"
                    height="25"
                  />
                </button>
              </div>
            </div>
          </div>
        )}
        {showChat ? (
          <img className={styles["icon-smaller"]} src="/down-arrow.png" onClick={handleToggle} alt="Close chatbot icon" />
        ) : (
          <img className={styles.icon} src="/icons8-chatbot.png" onClick={handleToggle} alt="Chatbot icon" />
        )}
        
      </div>
      );
    </>
  );
};

export default Chatbot;
