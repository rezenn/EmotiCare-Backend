const express = require("express");
const router = express.Router();
const authorization = require("../middleware/authMiddleware");
const validation = require("../middleware/validationMiddleware");
const authController = require("../controllers/authorizeControllers")

router.post("/register", validation, authController.registerUsers);
router.post("/login", validation, authController.loginUser);
router.get("/verified", authorization, authController.verifyUser);

module.exports = router;