import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

    const [comments, setComments] = useState([]);
    const [downloads, setDownloads] = useState([]);

    const user =
        JSON.parse(localStorage.getItem("user")) || {
            email: "vislavathnandhini@gmail.com",
            plan: "Silver"
        };

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const commentRes =
                await API.get("/comments");

            const downloadRes =
                await API.get("/downloads");

            setComments(commentRes.data);

            setDownloads(downloadRes.data);

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div
            style={{
                padding: "20px",
                margin: "20px",
                border: "1px solid gray",
                borderRadius: "10px"
            }}
        >

            <h2>📊 Dashboard</h2>

            <p>
                👤 User:
                <strong> {user.email}</strong>
            </p>

            <p>
                💎 Plan:
                <strong> {user.plan}</strong>
            </p>

            <p>
                💬 Total Comments:
                <strong> {comments.length}</strong>
            </p>

            <p>
                📥 Total Downloads:
                <strong> {downloads.length}</strong>
            </p>

        </div>
    );
}

export default Dashboard;