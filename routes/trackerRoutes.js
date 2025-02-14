const express = require("express");
const router = express.Router();
const { getUserInfo, addMood, getMoods,getLatestMood, countAllMoods, moodStreaks } = require("../controllers/TrackerControllers");
const authorize = require("../middleware/AuthMiddleware");

router.get("/", authorize, getUserInfo);
router.get("/userMood", authorize, getLatestMood);
router.get("/countMoods", authorize, countAllMoods);
router.get("/streaks", authorize, moodStreaks);
router.post("/", authorize, addMood);
router.get("/", authorize, getMoods);

module.exports = router;