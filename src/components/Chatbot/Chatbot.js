import React, { useState, useRef } from "react";
import styles from "./Chatbot.module.css";
import Link from "next/link";

const Chatbot = () => {
  const [showChat, setShowChat] = useState(false);
  const messageInputRef = useRef();
  const [allMessages, setAllMessages] = useState([]);
  // useEffect(() => {
  //   handleLoadMessages();
  // }, [allMessages]);

  const sendMessageHandler = (event) => {
    event.preventDefault();
    const enteredText = messageInputRef.current.value;

    fetch("http://127.0.0.1:5000/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: enteredText }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success from index:", data);
        handleLoadMessages();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
        handleMessages(data.messages);
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
              <ul>
                {allMessages.map((msg) => (
                  <li key="1">{msg}</li>
                ))}
              </ul>
              <button onClick={handleLoadMessages}>Load Messages</button>
            </div>
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                type="text"
                ref={messageInputRef}
                placeholder="Zadaj mi pytanie :)"
              />
              <button className={styles.button} onClick={sendMessageHandler}>
                <img src="/icons8-send.png" alt="send icon" width='25' height='25' />
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
