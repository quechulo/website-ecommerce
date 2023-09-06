import React, { useState, useRef, useEffect, useContext } from "react";
import styles from "./Chatbot.module.css";
import Link from "next/link";
import Image from "next/image";

import { UserContext } from "../../pages/_app";
import { useUser } from "@clerk/nextjs";

const Chatbot = () => {
  const [showChat, setShowChat] = useState(false);
  const messageInputRef = useRef();
  const [allMessages, setAllMessages] = useState([]);
  const [messagesList, setMessagesList] = useState([]);
  const [sendEndpoint, setSendEndpoint] = useState("send-fresh");
  const [loadingMsg, setLoadingMsg] = useState(false);
  const [messageSent, setMessageSent] = useState("");
  const { isLoaded, isSignedIn, user } = useUser();
  const { userEmail, setUserEmail } = useContext(UserContext);

  useEffect(() => {
    if (isLoaded && user) {
      
      setUserEmail(user.emailAddresses[0].emailAddress);
      
    } else if (isLoaded && !isSignedIn) {
      setUserEmail("guest");
      // Reset conversation after user logs out
      handleChangeContext();
    }
  }, [isLoaded, user, setUserEmail, userEmail, isSignedIn]);

  useEffect(() => {
    const regex = /(https?:\/\/[^\s]+)[^a-zA-Z0-9]+$/;
    const subRegex = /[[.).]/gi;
    const messagesElements = allMessages.map((msg, index) => {
      if (msg[1] == "user") {
        return (
          <div key={index} className={styles.messageCloudSent}>
            <div className={`${styles.message} ${styles.sent}`}>{msg[0]} </div>
          </div>
        );
      } else {
        
        let clearLink = msg[2];
        msg[0] = msg[0].replace('[link do produktu]', "");
        // if (linkContent) {
        //   // clearLink = clearLink.replace('[link do produktu]', "");
        //   clearLink = linkContent[0].replace(subRegex, "");
        //   let index = msg[0].indexOf(linkContent[0]);
        //   let newMessage = msg[0].substr(0, index) + msg[0].substr(index + linkContent[0].length);
        //   msg[0] = newMessage;
        // }

        return (
          <div key={index} className={styles.messageCloudReceived}>
            <img
              className={styles["chatbot-img"]}
              src="/icons8-chatbot.png"
              alt="message chatbot icon"
              width={50}
              height={50}
            />
            <div className={styles.message + " " + styles.received}>
              {msg[0]}
              {clearLink && <Link href={clearLink}> link</Link>}
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
    setMessageSent(enteredText);
    if (enteredText.trim().length === 0) {
      console.log("Empty message");
      messageInputRef.current.value = "Wiadomość nie może być pusta :(";
      return;
    }
    messageInputRef.current.value = " ";
    // UX Sending Message Animation
    setLoadingMsg(true);

    fetch(`http://127.0.0.1:5000/${sendEndpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: enteredText,
        sender: "user",
        userEmail: userEmail,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Message successfully sent:", data);

        if (
          // Don't change sendEndpoint if question was outside of ecommerce context
          data.answer.includes(
            "Niestety nie jestem w stanie odpowiedzieć na to pytanie,"
          ) ||
          data.sender === "bert" ||
          data.sender === "order_query"
        ) {
          setSendEndpoint("send-fresh");
        } else {
          setSendEndpoint("send");
        }
        handleLoadMessages();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChangeContext = () => {
    setSendEndpoint("send-fresh");
    setAllMessages([]);
    fetch("http://127.0.0.1:5000/fresh-conversation")
      .then((response) => response.json())
      .then((data) => {
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
    setLoadingMsg(false);
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
              <button className={`${styles.button} ${styles.changeContext}`} onClick={handleChangeContext}>
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
                  {loadingMsg ? (
                    <p className={styles["loading-spinner"]}></p>
                  ) : (
                    <Image
                      src="/icons8-send.png"
                      alt="send icon"
                      width="25"
                      height="25"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
        {showChat ? (
          <img
            className={styles["icon-smaller"]}
            src="/down-arrow.png"
            onClick={handleToggle}
            alt="Close chatbot icon"
          />
        ) : (
          <img
            className={styles.icon}
            src="/icons8-chatbot.png"
            onClick={handleToggle}
            alt="Chatbot icon"
          />
        )}
      </div>
    </>
  );
};

export default Chatbot;
