const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/student");
const {postPostStudent,editPostStudent,deletePostStudent,getPostStudent} = require ("../controllers/postControllers");

router.post("/", async (req,res) => {
    res.sendStatus(400);
});

router.get("/",authenticateToken,getPostStudent);
router.post("/post",authenticateToken,postPostStudent);
router.put("/update/:id",authenticateToken,editPostStudent);
router.delete("/delete/:id",authenticateToken,deletePostStudent);


module.exports = router;