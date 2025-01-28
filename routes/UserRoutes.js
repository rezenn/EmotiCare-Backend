const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserControllers");

router.get("/:email", userController.getProfile);
router.put("/:email", userController.updateProfile);

module.exports = router;
