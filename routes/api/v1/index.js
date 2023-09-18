const express = require("express");
const router= express.Router();

router.get("/", (req, res) => res.send("inside v1"));
router.use("/doctors", require("./doctors"));
router.use("/patients", require("./patients"));
router.use("/reports", require("./reports"));

module.exports = router;