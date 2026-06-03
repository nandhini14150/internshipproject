import { useEffect, useState } from "react";
import API from "../services/api";

function Home() {

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [translatedText, setTranslatedText] = useState("");

    const getComments = async () => {
        const res = await API.get("/comments");
        setComments(res.data);
    };

    useEffect(() => {
        getComments();
    }, []);

    const addComment = async () => {

        if (!comment.trim()) return;

        try {

            await API.post("/comments", {
                text: comment,
                user: "nandhini",
                city: "Hyderabad"
            });

            setComment("");
            getComments();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Error adding comment"
            );
        }
    };

    const likeComment = async (id) => {

        await API.post(`/comments/like/${id}`);
        getComments();
    };

    const dislikeComment = async (id) => {

        await API.post(`/comments/dislike/${id}`);
        getComments();
    };

    const translateComment = async (text) => {

        const res = await API.get(
            `/comments/translate/${text}`
        );

        setTranslatedText(
            res.data.translated
        );
    };

    return (

        <div
            style={{
                padding: "20px",
                maxWidth: "700px",
                margin: "auto",
                fontFamily: "Arial"
            }}
        >

            <h1 style={{ color: "inherit" }}>
                🎓 Internship Project
            </h1>

            <h2 style={{ color: "inherit" }}>
                Comments Section
            </h2>

            <div style={{ marginBottom: "15px" }}>

                <input
                    type="text"
                    placeholder="Enter Comment"
                    value={comment}
                    onChange={(e) =>
                        setComment(e.target.value)
                    }
                    style={{
                        padding: "10px",
                        width: "70%",
                        backgroundColor: "#ffffff",
                        color: "#000000",
                        border: "1px solid #999",
                        borderRadius: "5px"
                    }}
                />

                <button
                    onClick={addComment}
                    style={{
                        padding: "10px",
                        marginLeft: "10px",
                        cursor: "pointer"
                    }}
                >
                    Add Comment
                </button>

            </div>

            <hr />

            {
                comments.length === 0 ? (
                    <p>No comments yet</p>
                ) : (
                    comments.map((c) => (

                        <div
                            key={c.id}
                            style={{
                                border: "1px solid #ddd",
                                padding: "15px",
                                marginBottom: "15px",
                                borderRadius: "10px",
                                backgroundColor: "#ffffff",
                                color: "#000000",
                                boxShadow:
                                    "0 2px 8px rgba(0,0,0,0.1)"
                            }}
                        >

                            <h3 style={{ margin: 0 }}>
                                {c.user}
                            </h3>

                            <p>{c.text}</p>

                            <small>
                                📍 {c.city}
                            </small>

                            {
                                translatedText && (
                                    <p>
                                        <b>
                                            Translated:
                                        </b>{" "}
                                        {translatedText}
                                    </p>
                                )
                            }

                            <div
                                style={{
                                    marginTop: "10px"
                                }}
                            >

                                <button
                                    onClick={() =>
                                        likeComment(c.id)
                                    }
                                >
                                    👍 {c.likes}
                                </button>

                                <button
                                    onClick={() =>
                                        dislikeComment(c.id)
                                    }
                                    style={{
                                        marginLeft: "10px"
                                    }}
                                >
                                    👎 {c.dislikes}
                                </button>

                                <button
                                    onClick={() =>
                                        translateComment(
                                            c.text
                                        )
                                    }
                                    style={{
                                        marginLeft: "10px"
                                    }}
                                >
                                    🌐 Translate
                                </button>

                            </div>

                        </div>

                    ))
                )
            }

        </div>
    );
}

export default Home;