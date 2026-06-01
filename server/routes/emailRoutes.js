const express = require("express");

const router = express.Router();

router.post("/invoice", (req, res) => {

    const { email, plan } = req.body;

    console.log(
        `Invoice sent to ${email} for ${plan}`
    );

    res.json({
        message: "Invoice email sent successfully"
    });
});

module.exports = router;