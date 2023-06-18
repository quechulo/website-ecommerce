import { SignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import styles from "@/styles/sign-in.module.css";
// import { useEffect, useState, useContext } from "react";




export default function Page() {
  

  
  
  return (
    <div className={styles.signInContainer}>
      <SignIn />
    </div>
  );
}
