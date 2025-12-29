const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
    db.query("SELECT * FROM tournament", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

module.exports = router;
