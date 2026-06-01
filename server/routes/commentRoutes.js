const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const filePath = path.join(__dirname, "../data/comments.json");

// Read comments
const getComments = () => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "[]");
    }

    return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

// Save comments
const saveComments = (comments) => {
    fs.writeFileSync(
        filePath,
        JSON.stringify(comments, null, 2)
    );
};

// ======================
// GET COMMENTS
// ======================

router.get("/", (req, res) => {

    const comments = getComments();

    res.json(comments);
});

// ======================
// ADD COMMENT
// ======================

router.post("/", (req, res) => {

    try {

        const { text, user, city } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({
                message: "Comment cannot be empty"
            });
        }

        // Allow all languages
        // Block only special symbols

        const regex = /^[\p{L}\p{N}\s]+$/u;

        if (!regex.test(text)) {

            return res.status(400).json({
                message:
                    "Special characters are not allowed"
            });
        }

        const comments = getComments();

        const newComment = {
            id: uuidv4(),
            text,
            user,
            city,
            likes: 0,
            dislikes: 0
        };

        comments.unshift(newComment);

        saveComments(comments);

        res.json(newComment);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error adding comment"
        });
    }
});

// ======================
// LIKE COMMENT
// ======================

router.post("/like/:id", (req, res) => {

    const comments = getComments();

    const comment = comments.find(
        (c) => c.id === req.params.id
    );

    if (!comment) {

        return res.status(404).json({
            message: "Comment not found"
        });
    }

    comment.likes += 1;

    saveComments(comments);

    res.json({
        message: "Liked successfully"
    });
});

// ======================
// DISLIKE COMMENT
// ======================

router.post("/dislike/:id", (req, res) => {

    let comments = getComments();

    const comment = comments.find(
        (c) => c.id === req.params.id
    );

    if (!comment) {

        return res.status(404).json({
            message: "Comment not found"
        });
    }

    comment.dislikes += 1;

    // Auto delete after 2 dislikes

    comments = comments.filter(
        (c) => c.dislikes < 2
    );

    saveComments(comments);

    res.json({
        message: "Disliked successfully"
    });
});

// ======================
// TRANSLATE COMMENT
// ======================

router.get("/translate/:text", (req, res) => {

    const text = req.params.text;

    res.json({
        original: text,
        translated: text + " (Translated)"
    });
});

module.exports = router;