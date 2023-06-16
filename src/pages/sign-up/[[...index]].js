import { SignUp } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Page() {
  const user = useUser();

  useEffect(() => {
    console.log("user:", user)
  }, [user]);

  

  return (
    <SignUp />
  );
}
