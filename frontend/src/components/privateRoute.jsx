import { useRouter } from "next/router";
import { useEffect } from "react";

// This component will redirect the user to the login page if they are not logged in
const PrivateRoute = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUser = localStorage.getItem("user");
            if (!storedUser) {
                // If no user data exists, redirect to login page
                router.push("/");
            }
        }
    }, [router]);

    // If the user is logged in, render the children (content)
    return <>{children}</>;
};

export default PrivateRoute;
