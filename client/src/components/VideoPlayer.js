import { useRef, useState, useEffect } from "react";
import API from "../services/api";

function VideoPlayer() {

    const videoRef = useRef();

    const user =
        JSON.parse(localStorage.getItem("user")) || {
            email: "vislavathnandhini@gmail.com",
            plan: "Free"
        };

    const getWatchLimit = () => {

        switch (user.plan) {

            case "Bronze":
                return 7 * 60;

            case "Silver":
                return 10 * 60;

            case "Gold":
                return Infinity;

            default:
                return 5 * 60;
        }
    };

    const [remainingTime, setRemainingTime] =
        useState(getWatchLimit());

    const [clickCount, setClickCount] =
        useState(0);

    useEffect(() => {

        if (user.plan === "Gold") return;

        const interval = setInterval(() => {

            setRemainingTime((prev) => {

                if (prev <= 1) {

                    if (videoRef.current) {
                        videoRef.current.pause();
                    }

                    alert(
                        "Watch limit reached. Upgrade your plan."
                    );

                    clearInterval(interval);

                    return 0;
                }

                return prev - 1;
            });

        }, 1000);

        return () => clearInterval(interval);

    }, [user.plan]);

    const handleDownload = async () => {

        try {

            const res = await API.post(
                "/downloads",
                {
                    user: user.email,
                    video: "sample-video",
                    plan: user.plan
                }
            );

            alert(res.data.message);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Download failed"
            );
        }
    };

    const togglePlayPause = () => {

        if (!videoRef.current) return;

        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    const forward10 = () => {

        if (videoRef.current) {
            videoRef.current.currentTime += 10;
        }
    };

    const backward10 = () => {

        if (videoRef.current) {
            videoRef.current.currentTime -= 10;
        }
    };

    const handleCenterClick = () => {

        const newCount = clickCount + 1;

        setClickCount(newCount);

        setTimeout(() => {

            if (newCount === 1) {

                togglePlayPause();

            } else if (newCount === 3) {

                alert("Next Video");
            }

            setClickCount(0);

        }, 400);
    };

    const openComments = () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        alert("Comments Opened");
    };

    const closeWebsite = () => {

        alert(
            "Browser blocks automatic tab closing."
        );

        window.close();
    };

    return (

        <div style={{ padding: "20px" }}>

            <h2>🎥 Video Player</h2>

            <p>
                Current Plan:
                <strong> {user.plan}</strong>
            </p>

            {
                user.plan === "Gold"
                    ? (
                        <p>
                            Remaining Time:
                            Unlimited
                        </p>
                    )
                    : (
                        <p>
                            Remaining Time:
                            {remainingTime} sec
                        </p>
                    )
            }

            <div
                style={{
                    position: "relative",
                    width: "600px"
                }}
            >

                <video
                    ref={videoRef}
                    width="600"
                    controls
                >
                    <source
                        src="https://www.w3schools.com/html/mov_bbb.mp4"
                        type="video/mp4"
                    />
                </video>

                <div
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "33%",
                        height: "100%"
                    }}
                    onDoubleClick={backward10}
                    onTripleClick={openComments}
                />

                <div
                    style={{
                        position: "absolute",
                        left: "33%",
                        top: 0,
                        width: "34%",
                        height: "100%"
                    }}
                    onClick={handleCenterClick}
                />

                <div
                    style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        width: "33%",
                        height: "100%"
                    }}
                    onDoubleClick={forward10}
                    onTripleClick={closeWebsite}
                />

            </div>

            <br />
            <br />

            <button onClick={handleDownload}>
                Download Video
            </button>

        </div>
    );
}

export default VideoPlayer;