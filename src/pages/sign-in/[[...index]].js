import { SignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import styles from "@/styles/sign-in.module.css";
import { useEffect } from "react";

export default function Page() {
  const user = useUser();

  useEffect(() => {
    console.log("user:", user)
  }, [user]);
  
  return (
    <div className={styles.signInContainer}>
      <SignIn />
    </div>
  );
}
