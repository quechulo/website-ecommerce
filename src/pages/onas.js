import Navbar from "@/components/NavigationBar/Navbar";
import Head from "next/head";

function AboutPage() {
  return (
    <>
      <Head>
        <title>O Nas</title>
        <meta name="description" content="About Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>O Nas</h1>
        <h3>
          Witamy w naszym sklepie Buy Stuff. W naszej ofercie posiadamy wiele
          markowych butów i ubrań. Oferujemy najlepsze ceny i staramy się
          obsługiwać klienta na najwyższym poziomie.
        </h3>
      </main>
    </>
  );
}

export default AboutPage;
