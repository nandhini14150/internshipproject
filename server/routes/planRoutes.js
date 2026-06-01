const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const usersFile = path.join(
    __dirname,
    "../data/users.json"
);

// GET CURRENT PLAN
router.get("/:email", (req, res) => {

    const users = JSON.parse(
        fs.readFileSync(usersFile)
    );

    const user = users.find(
        u => u.email === req.params.email
    );

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json({
        plan: user.plan
    });
});

// UPGRADE PLAN
router.post("/upgrade", (req, res) => {

    const { email, plan } = req.body;

    const users = JSON.parse(
        fs.readFileSync(usersFile)
    );

    const user = users.find(
        u => u.email === email
    );

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    user.plan = plan;

    fs.writeFileSync(
        usersFile,
        JSON.stringify(users, null, 2)
    );

    res.json({
        message: `Plan upgraded to ${plan}`
    });
});

module.exports = router;