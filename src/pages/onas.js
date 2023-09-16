import Navbar from "@/components/NavigationBar/Navbar";
import Head from "next/head";
import styles from "./index.module.css";

function AboutPage() {
  return (
    <>
      <Head>
        <title>O Nas</title>
        <meta name="description" content="About Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles["help-page"]}>
        <h1>O Nas</h1>
        <h3>
          Witamy w naszym sklepie Buy Stuff. W naszej ofercie posiadamy wiele
          markowych butów i ubrań. Oferujemy najlepsze ceny i staramy się
          obsługiwać klienta na najwyższym poziomie.
        </h3>
        <br />
        <h3>Nasz sklep stacjonarny znajduje się pod adresem: 00-000 Zakupowo 123, Mazowieckie, Polska</h3>
        <h4>Średni czas realizacji zamówienia to 2 dni robocze.</h4>
      </main>
    </>
  );
}

export default AboutPage;
