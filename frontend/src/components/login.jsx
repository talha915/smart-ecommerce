import React, { useEffect } from "react";
import { useRouter } from 'next/router';

export default function GoogleLogin() {

    const router = useRouter();

    useEffect(() => {
        /* Load the Google SDK */
        const loadGoogleSDK = () => {
            window.google.accounts.id.initialize({
                client_id: "", // Replace with your actual Google Client ID
                callback: handleCallbackResponse,
            });

            /* Render the Google Sign-In button */
            window.google.accounts.id.renderButton(
                document.getElementById("google-signin-button"),
                {
                    theme: "outline",
                    size: "large",
                    text: "signin_with",
                }
            );

            /* Optionally enable One Tap */
            // window.google.accounts.id.prompt();
        };

        if (!window.google) {
            const script = document.createElement("script");
            script.src = "https://accounts.google.com/gsi/client";
            script.async = true;
            script.defer = true;
            script.onload = loadGoogleSDK;
            document.body.appendChild(script);
        } else {
            loadGoogleSDK();
        }
    }, []);

    const handleCallbackResponse = (response) => {
        const userObject = JSON.parse(atob(response.credential.split(".")[1]));
        console.log("User Info:", userObject);
        if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(userObject));
            if(JSON.parse(localStorage.getItem("user")).hasOwnProperty('email_verified')) {
                router.push('/products')
            }
        }
        alert(`Welcome, ${userObject.name}`);
    };
    

    


    return (
        <div>
            <div id="google-signin-button"></div>
        </div>
    );
}
