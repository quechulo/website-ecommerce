import "../styles/styles.css";
import Navbar from "@/components/NavigationBar/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
