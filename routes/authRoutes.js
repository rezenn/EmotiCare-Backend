const express = require("express");
const router = express.Router();
const authorization = require("../middleware/AuthMiddleware");
const validation = require("../middleware/ValidationMiddleware");
const authController = require("../controllers/AuthorizeControllers")

router.post("/register", validation, authController.registerUsers);
router.post("/login", validation, authController.loginUser);
router.post("/forgotPassword", validation, authController.forgotPassword);
router.get("/verified", authorization, authController.verifyUser);

module.exports = router;