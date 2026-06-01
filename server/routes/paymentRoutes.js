const express = require("express");

const router = express.Router();

router.post("/create-order", (req, res) => {

    const { plan } = req.body;

    let amount = 0;

    if (plan === "Bronze") amount = 10;
    if (plan === "Silver") amount = 50;
    if (plan === "Gold") amount = 100;

    res.json({
        amount,
        orderId: Date.now()
    });
});

module.exports = router;