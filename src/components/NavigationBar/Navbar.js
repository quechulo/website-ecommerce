import Link from "next/link";
import styles from "./Navbar.module.css";
import { Dropdown } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { useState, useEffect } from "react";
import UButton from "../UI/UButton";
import { useAuth } from '@clerk/nextjs';

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    checkScreenWidth();

    window.addEventListener("resize", checkScreenWidth);
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  const handleMenuClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles["navbar-brand"]}>
        Buy Stuff
      </Link>
      {isMobile ? (
        <>
          <Dropdown className={styles["navbar-nav"]} title="Menu">
            <ul className={styles["navbar-menu"]}>
              <Dropdown className={styles["nav-item"]} title="Produkty">
                <Dropdown.Item
                  as="a"
                  style={{ textDecoration: "none" }}
                  href="/produkty/buty"
                >
                  Buty
                </Dropdown.Item>

                <Dropdown.Item
                  as="a"
                  style={{ textDecoration: "none" }}
                  href="/produkty/ubrania"
                >
                  Ubrania
                </Dropdown.Item>

                <Dropdown.Item as="a" href="/">
                  Inne
                </Dropdown.Item>
              </Dropdown>

              <Dropdown.Item
                  as="a"
                  style={{ textDecoration: "none" }}
                  href="/about"
                >
                  O Nas
                </Dropdown.Item>
                
              <Dropdown.Item
                  as="a"
                  style={{ textDecoration: "none" }}
                  href="/koszyk"
                >
                  Koszyk
                </Dropdown.Item>

            </ul>
          </Dropdown>
          {!userId ?(
            <ul className={styles["navbar-nav"]}>
            <li className={styles["nav-item"]}>
            <Link href="/sign-in" className={styles["nav-link"]}>
              Konto
            </Link>
          </li>
          </ul>
          ):(
            <ul className={styles["navbar-nav"]}>
            <li className={styles["nav-item"]}>
              <UButton />
            </li>
            </ul>
          )}
        </>
      ) : (
        <ul className={styles["navbar-nav"]}>
          <Dropdown className={styles["nav-item"]} title="Produkty">
            <Dropdown.Item
              as="a"
              style={{ textDecoration: "none" }}
              href="/produkty/buty"
            >
              Buty
            </Dropdown.Item>

            <Dropdown.Item
              as="a"
              style={{ textDecoration: "none" }}
              href="/produkty/ubrania"
            >
              Ubrania
            </Dropdown.Item>

            <Dropdown.Item as="a" href="/">
              Inne
            </Dropdown.Item>
          </Dropdown>
          {/* <Link href="/products" className={styles['nav-link']}>Products</Link> */}

          <li className={styles["nav-item"]}>
            <Link className={styles["nav-link"]} href="/about">
              O nas
            </Link>
          </li>
          <li className={styles["nav-item"]}>
            <Link href="/koszyk" className={styles["nav-link"]}>
              Koszyk
            </Link>
          </li>

          {/* <li className={styles["nav-item"]}>
            <Link href="/account" className={styles["nav-link"]}>
              Konto
            </Link>
          </li> */}
          {!userId ?(
            <li className={styles["nav-item"]}>
            <Link href="/sign-in" className={styles["nav-link"]}>
              Konto
            </Link>
          </li>
          ):(
            <li className={styles["nav-item"]}>
              <UButton />
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}
