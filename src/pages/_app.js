import "../styles/styles.css";
import Navbar from "@/components/NavigationBar/Navbar";
import Chatbot from "@/components/Chatbot/Chatbot";
import { ClerkProvider } from "@clerk/nextjs";
import { enUS } from "@clerk/localizations";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ClerkProvider localization={enUS}>
        <Navbar />
        <Component {...pageProps} />
        <Chatbot />
      </ClerkProvider>
    </>
  );
}
