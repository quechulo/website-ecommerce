import "../styles/styles.css";
import Navbar from "@/components/NavigationBar/Navbar";
import Chatbot from "@/components/Chatbot/Chatbot";
import { ClerkProvider } from "@clerk/nextjs";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ClerkProvider>
        <Navbar />
        <Component {...pageProps} />
        <Chatbot />
      </ClerkProvider>
    </>
  );
}
