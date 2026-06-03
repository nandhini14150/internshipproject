import { useEffect, useState } from "react";
import API from "../services/api";

function Downloads() {

    const [video, setVideo] = useState("");
    const [downloads, setDownloads] = useState([]);

    const user = "nandhini";

    const getDownloads = async () => {

        const res = await API.get("/downloads");

        const userDownloads = res.data.filter(
            (d) => d.user === user
        );

        setDownloads(userDownloads);
    };

    useEffect(() => {
        getDownloads();
    }, []);

    const downloadVideo = async () => {

        if (!video.trim()) {
            alert("Enter video name");
            return;
        }

        try {

            const res = await API.post("/downloads", {
                user: user,
                video: video,
                plan: "free"
            });

            alert(res.data.message);

            setVideo("");

            getDownloads();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Download failed"
            );
        }
    };

    return (

        <div
            style={{
                padding: "20px",
                maxWidth: "700px",
                margin: "auto"
            }}
        >

            <h1>📥 Downloads Page</h1>

            <input
                placeholder="Enter video name"
                value={video}
                onChange={(e) =>
                    setVideo(e.target.value)
                }
                style={{
                    padding: "8px",
                    width: "70%"
                }}
            />

            <button
                onClick={downloadVideo}
                style={{
                    marginLeft: "10px",
                    padding: "8px"
                }}
            >
                Download
            </button>

            <hr />

            <h2>Your Downloads</h2>

            {
                downloads.length === 0 ? (
                    <p>No downloads yet</p>
                ) : (
                    downloads.map((d) => (

                        <div
                            key={d.id}
                            style={{
                                border: "1px solid #ccc",
                                padding: "10px",
                                marginBottom: "10px",
                                borderRadius: "8px"
                            }}
                        >

                            <h4>{d.video}</h4>

                            <small>
                                {new Date(
                                    d.date
                                ).toLocaleString()}
                            </small>

                        </div>

                    ))
                )
            }

        </div>
    );
}

export default Downloads;