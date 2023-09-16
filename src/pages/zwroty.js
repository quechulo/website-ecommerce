import Navbar from "@/components/NavigationBar/Navbar";
import Head from "next/head";
import styles from "./index.module.css";

function ComplaintPage() {
  return (
    <>
      <Head>
        <title>Zwroty</title>
        <meta name="description" content="Complaint Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles["help-page"]}>
        <h1>Reklamacje w naszym sklepie</h1>
        <h3>
          W Buy Stuff oferujemy darmowe zwroty do 14-dni po odbiorze zamówienia.
          Wszystkie reklamacje prosimy składać drogą mailową na adres: bok@buystuff.pl, bądź dzwoniąc na numer: 123-456-789
        </h3>
        <h4> Zwroty należy wysłać na adres: 00-000 Zakupowo 123, Mazowieckie, Polska</h4>
      </main>
    </>
  );
}

export default ComplaintPage;
