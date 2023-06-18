import "../styles/styles.css";
import Navbar from "@/components/NavigationBar/Navbar";
import Chatbot from "@/components/Chatbot/Chatbot";
import { ClerkProvider } from "@clerk/nextjs";
import { enUS } from "@clerk/localizations";

import { createContext, useState } from "react";

export const UserContext = createContext();

export default function App({ Component, pageProps }) {
  const [userEmail, setUserEmail] = useState("");

  return (
    <UserContext.Provider value={{ userEmail, setUserEmail }}>
      <ClerkProvider localization={enUS}>
        <Navbar />
        <Component {...pageProps} />
        <Chatbot />
      </ClerkProvider>
    </UserContext.Provider>
  );
}
