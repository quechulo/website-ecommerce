import Link from "next/link";
import styles from "./Navbar.module.css";
import { Dropdown } from "rsuite";
import "rsuite/dist/rsuite.min.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles["navbar-brand"]}>
        Buy Stuff
      </Link>
      <ul className={styles["navbar-nav"]}>
        <Dropdown className={styles["nav-item"]} title="Produkty">
          <Dropdown.Item as="a" style={{ textDecoration: "none" }} href="/produkty/buty">
            Buty
          </Dropdown.Item>

          <Dropdown.Item as="a" style={{ textDecoration: "none" }} href="/produkty/ubrania">
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
          <Link href="/cart" className={styles["nav-link"]}>
            Koszyk
          </Link>
        </li>

        <li className={styles["nav-item"]}>
          <Link href="/account" className={styles["nav-link"]}>
            Konto
          </Link>
        </li>
      </ul>
    </nav>
  );
}
