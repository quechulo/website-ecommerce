import Navbar from "@/components/NavigationBar/Navbar";
import Head from "next/head";

function AboutPage() {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="About Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>About Page</div>
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
