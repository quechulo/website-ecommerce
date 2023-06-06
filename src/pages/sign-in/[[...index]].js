import { SignIn } from "@clerk/nextjs";
import styles from "@/styles/sign-in.module.css";

export default function Page() {
  return (
    <div className={styles.signInContainer}>
      <SignIn />
    </div>
  );
}
