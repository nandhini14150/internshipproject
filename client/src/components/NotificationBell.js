import { useEffect, useState } from "react";
import socket from "../socket";

function NotificationBell() {

    const [notifications, setNotifications] =
        useState([]);

    const [show, setShow] =
        useState(false);

    useEffect(() => {

        socket.on(
            "notification",
            (message) => {

                setNotifications(prev => [
                    message,
                    ...prev
                ]);
            }
        );

        return () => {
            socket.off("notification");
        };

    }, []);

    return (

        <div
            style={{
                position: "fixed",
                top: "20px",
                right: "20px",
                zIndex: 999
            }}
        >

            <button
                onClick={() =>
                    setShow(!show)
                }
            >
                🔔 {notifications.length}
            </button>

            {
                show && (

                    <div
                        style={{
                            background: "white",
                            color: "black",
                            width: "250px",
                            padding: "10px",
                            borderRadius: "10px",
                            boxShadow:
                                "0px 0px 10px rgba(0,0,0,0.2)"
                        }}
                    >

                        <h3>
                            Notifications
                        </h3>

                        {
                            notifications.length === 0
                                ? (
                                    <p>
                                        No notifications
                                    </p>
                                )
                                : (
                                    notifications.map(
                                        (n, i) => (
                                            <p key={i}>
                                                {n}
                                            </p>
                                        )
                                    )
                                )
                        }

                    </div>

                )
            }

        </div>
    );
}

export default NotificationBell;