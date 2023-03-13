import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/NavigationBar/Navbar";

const inter = Inter({ subsets: ["latin"] });

function HomePage() {
  return (
    <main>
      <Navbar />
      <div>Homepage content</div>
    </main>
  );
}

export default HomePage;
