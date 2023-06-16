import { useUser } from "@clerk/nextjs";
import Loading from "@/components/helpers/Loading";
import { useEffect } from "react";
// import { insertNewUser } from "../../../db/db-utils";


function AddUserPage() {
    const { isLoaded, isSignedIn, user } = useUser();

    useEffect(() => {
        
        if (user) {
            const email = user.emailAddresses[0].emailAddress
            console.log("user:", email)
            
            // await insertNewUser({email: user.emailAddresses[0].emailAddress})
            fetch(`/api/addUserToDb`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email, cart: [] }),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log("Data:", data);
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
        }
    }, [user]);

    
    
    return (
      <div>
        {!isLoaded || !user ? (
            <>
            <h1>Hi New User!!!</h1>
            <Loading />
            </>
        ) : (
            <h4> Your email:  {user.emailAddresses[0].emailAddress}</h4>
        )
        }
      </div>
    );
  }
  
  export default AddUserPage;