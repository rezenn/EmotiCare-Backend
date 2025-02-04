const express = require("express");
const router = express.Router();
const { getUserInfo, addMood, getMoods  } = require("../controllers/TrackerControllers");
const authorize = require("../middleware/AuthMiddleware");

router.get("/", authorize, getUserInfo);
// router.post("/", authorize, addMood);
router.post("/", authorize, addMood);
router.get("/", authorize, getMoods);

module.exports = router;