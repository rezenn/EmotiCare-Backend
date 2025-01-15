const express = require("express");
const router = express.Router();
const { getUserInfo } = require("../controllers/trackerControllers");
const authorize = require("../middleware/authMiddleware");

router.get("/", authorize, getUserInfo);

module.exports = router;