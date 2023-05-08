import "../styles/styles.css";
import Navbar from "@/components/NavigationBar/Navbar";
import Chatbot from "@/components/Chatbot/Chatbot";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Chatbot />
    </>
  );
}
