import Navbar from "@/components/NavigationBar/Navbar";
import Head from "next/head";

function ComplaintPage() {
  return (
    <>
      <Head>
        <title>Zwroty</title>
        <meta name="description" content="Complaint Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>Zwroty w naszym sklepie</div>
        <h3>
          W Buy Stuff oferujemy darmowe zwroty do 14-dni po odbiorze zamówienia.
          Wszystkie reklamacje prosimy składać drogą mailową na adres: bok@buystuff.pl, bądź dzwoniąc na numer: 123-456-789
        </h3>
      </main>
    </>
  );
}

export default ComplaintPage;
