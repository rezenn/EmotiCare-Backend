const express = require("express");
const router = express.Router();
const { getUserInfo, addMood, getMoods } = require("../controllers/trackerControllers");
const authorize = require("../middleware/authMiddleware");

router.get("/", authorize, getUserInfo);
router.post("/", authorize, addMood);
router.get("/mood", authorize, getMoods);

module.exports = router;