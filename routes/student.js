const express = require("express");
const router = express.Router();

const { registerstd, loginstd,refreshstd} = require("../controllers/studentControllers");

router.post("/", async (req,res) => {
    res.sendStatus(400);
});

router.post("/register", registerstd);
router.post("/login" , loginstd);
router.post("/refresh" , refreshstd);

module.exports = router;