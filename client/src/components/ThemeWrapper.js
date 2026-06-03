import { useEffect, useState } from "react";

function ThemeWrapper({ children }) {

    const [theme, setTheme] = useState("dark");

    useEffect(() => {

        const hour = new Date().getHours();

        const southStates = [
            "Telangana",
            "Andhra Pradesh",
            "Tamil Nadu",
            "Kerala",
            "Karnataka"
        ];

        // Demo location
        const userState = "Telangana";

        if (
            hour >= 10 &&
            hour <= 12 &&
            southStates.includes(userState)
        ) {
            setTheme("light");
        } else {
            setTheme("dark");
        }

    }, []);

    return (

        <div
            style={{
                backgroundColor:
                    theme === "light"
                        ? "#f0f2f5"
                        : "#222222",

                color:
                    theme === "light"
                        ? "#000000"
                        : "#ffffff",

                minHeight: "100vh",
                padding: "20px"
            }}
        >
            {children}
        </div>

    );
}

export default ThemeWrapper;