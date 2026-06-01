const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const { readData, writeData } = require("../utils/fileHelper");

const router = express.Router();

const usersFile = path.join(__dirname, "../data/users.json");

// REGISTER
router.post("/register", (req, res) => {

    const users = readData(usersFile);

    const newUser = {
        id: uuidv4(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        plan: "Free"
    };

    users.push(newUser);

    writeData(usersFile, users);

    res.json({
        message: "User Registered Successfully",
        user: newUser
    });
});

// LOGIN
router.post("/login", (req, res) => {

    const users = readData(usersFile);

    const user = users.find(
        u =>
            u.email === req.body.email &&
            u.password === req.body.password
    );

    if (!user) {
        return res.json({
            message: "Invalid Email or Password"
        });
    }

    res.json({
        message: "Login Successful",
        user
    });
});

module.exports = router;