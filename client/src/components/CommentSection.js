import { useEffect, useState } from "react";
import API from "../services/api";

function CommentSection() {

  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  // SAFE USER
  const user =
    JSON.parse(localStorage.getItem("user"))
    || {
      name: "Guest",
      city: "Hyderabad"
    };

  // LOAD COMMENTS
  const loadComments = async () => {

    const res = await API.get("/comments");

    setComments(res.data);
  };

  useEffect(() => {
    loadComments();
  }, []);

  // ADD COMMENT
  const addComment = async () => {

    // BLOCK SPECIAL CHARACTERS
    const regex = /^[a-zA-Z0-9\s]+$/;

    if (!regex.test(text)) {
      alert("Special characters not allowed");
      return;
    }

    await API.post("/comments", {
      text,
      user: user.name,
      city: user.city
    });

    setText("");

    loadComments();
  };

  // LIKE
  const likeComment = async (id) => {

    await API.post(`/comments/like/${id}`);

    loadComments();
  };

  // DISLIKE
  const dislikeComment = async (id) => {

    await API.post(`/comments/dislike/${id}`);

    loadComments();
  };

  return (
    <div style={{ marginTop: "40px" }}>

      <h2>Comments</h2>

      <input
        type="text"
        placeholder="Enter Comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          padding: "10px",
          width: "300px"
        }}
      />

      <button
        onClick={addComment}
        style={{
          marginLeft: "10px",
          padding: "10px"
        }}
      >
        Add Comment
      </button>

      <hr />

      {
        comments.map((c) => (

          <div
            key={c.id}
            style={{
              marginBottom: "20px",
              border: "1px solid gray",
              padding: "10px"
            }}
          >

            <h3>{c.user}</h3>

            <p>
              <b>City:</b> {c.city}
            </p>

            <p>{c.text}</p>

            <button
              onClick={() => likeComment(c.id)}
            >
              👍 {c.likes}
            </button>

            <button
              onClick={() => dislikeComment(c.id)}
              style={{ marginLeft: "10px" }}
            >
              👎 {c.dislikes}
            </button>

          </div>
        ))
      }

    </div>
  );
}

export default CommentSection;