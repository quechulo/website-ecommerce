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
        <Navbar />
        <div>About Page</div>
      </main>
    </>
  );
}

export default AboutPage;
