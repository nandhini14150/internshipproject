const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath = path.join(__dirname, "../data/downloads.json");

// Create file if not exists
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
}

// GET DOWNLOADS
router.get("/", (req, res) => {

    const downloads = JSON.parse(
        fs.readFileSync(filePath, "utf8")
    );

    res.json(downloads);
});

// ADD DOWNLOAD
router.post("/", (req, res) => {

    const { user, video, plan } = req.body;

    const downloads = JSON.parse(
        fs.readFileSync(filePath, "utf8")
    );

    const today = new Date().toDateString();

    const todayDownloads = downloads.filter(
        (d) =>
            d.user === user &&
            new Date(d.date).toDateString() === today
    );

    // Free user = 1 download/day
    if (
        plan === "free" &&
        todayDownloads.length >= 1
    ) {
        return res.status(400).json({
            message:
                "Free users can download only 1 video per day. Upgrade to Premium."
        });
    }

    const newDownload = {
        id: Date.now(),
        user,
        video,
        plan,
        date: new Date()
    };

    downloads.push(newDownload);

    fs.writeFileSync(
        filePath,
        JSON.stringify(downloads, null, 2)
    );

    res.json({
        message: "Download Success",
        download: newDownload
    });
});

module.exports = router;