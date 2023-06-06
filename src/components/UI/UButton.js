import { UserButton } from "@clerk/nextjs";
import styles from "./UButton.module.css";
 
export default function UButton() {
  return (
			<UserButton signInUrl="/sign-in" afterSignOutUrl="/"/>
  );
}