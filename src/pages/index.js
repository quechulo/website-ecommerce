import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });


function HomePage() {
  const messageInputRef = useRef();
  const [allMessages, setAllMessages] = useState([]);
  // useEffect(() => {
  //   handleLoadMessages();
  // }, [allMessages]);
  
  
  const submitFormHandler = (event) => {
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
    let start_index = answer.indexOf('http');
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

  return (
    <main>
      <div>Homepage content</div>
      <div>
        <form onSubmit={submitFormHandler}>
          <input type="text" ref={messageInputRef} />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <button onClick={handleLoadMessages}>Load Messages</button>
        <ul>
        {allMessages.map((msg) => (
          <li key='1'>
            { msg }
          </li>
        ))}
      </ul>
     </div>
    </main>
  );
}

export default HomePage;
