const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./routes/authRoutes");
const commentRoutes = require("./routes/commentRoutes");
const downloadRoutes = require("./routes/downloadRoutes");
const planRoutes = require("./routes/planRoutes");
const otpRoutes = require("./routes/otpRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const emailRoutes = require("./routes/emailRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/downloads", downloadRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/email", emailRoutes);

app.get("/", (req, res) => {
    res.send("Backend Running Successfully");
});

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {

    console.log("User Connected:", socket.id);

    socket.emit(
        "notification",
        "Welcome to Internship Project"
    );

    socket.on("disconnect", () => {

        console.log(
            "User Disconnected:",
            socket.id
        );
    });
});

server.listen(5000, () => {

    console.log(
        "Server running on port 5000"
    );
});