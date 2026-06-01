const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const otpFile = path.join(
    __dirname,
    "../data/otp.json"
);

// SEND OTP
router.post("/send", (req, res) => {

    const { email, state, mobile } = req.body;

    const otp =
        Math.floor(
            100000 +
            Math.random() * 900000
        );

    fs.writeFileSync(
        otpFile,
        JSON.stringify(
            [{ email, otp }],
            null,
            2
        )
    );

    const southStates = [
        "Telangana",
        "Andhra Pradesh",
        "Tamil Nadu",
        "Kerala",
        "Karnataka"
    ];

    if (southStates.includes(state)) {

        console.log(
            `EMAIL OTP for ${email}: ${otp}`
        );

        return res.json({
            message:
                "OTP sent to Email (South India User)"
        });
    }

    console.log(
        `MOBILE OTP for ${mobile}: ${otp}`
    );

    res.json({
        message:
            "OTP sent to Mobile (Other State User)"
    });
});

// VERIFY OTP
router.post("/verify", (req, res) => {

    const { email, otp } = req.body;

    const data = JSON.parse(
        fs.readFileSync(otpFile)
    );

    const record = data.find(
        x => x.email === email
    );

    if (
        record &&
        record.otp == otp
    ) {

        return res.json({
            message:
                "OTP Verified Successfully"
        });
    }

    res.status(400).json({
        message:
            "Invalid OTP"
    });
});

module.exports = router;