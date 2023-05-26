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
          <li key={index} className={styles.message + " " + styles.sent}>
            {msg[0]}
          </li>
        );
      } else {
        return (
          <li key={index} className={styles.message + " " + styles.received}>
            {msg[0]}
          </li>
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
    setShowChat(!showChat);
  };

  return (
    <>
      <div className={styles.chatbot}>
        {showChat && (
          <div className={styles.container}>
            <div className={styles.messageContainer}>
              <ul className={styles.messages}>{messagesList}</ul>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.button} onClick={handleChangeContext}>Zmień temat rozmowy</button>
            </div>
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
        )}
        <button className={styles.icon} onClick={handleToggle}>
          <img src="/icons8-chatbot.png" alt="Chatbot Icon" />
        </button>
      </div>
      );
    </>
  );
};

export default Chatbot;
