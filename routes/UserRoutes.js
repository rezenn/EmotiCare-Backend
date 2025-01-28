const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserControllers");
const upload = require("../middleware/ImageMulter");

router.get("/", userController.getUserEmail);
router.get("/:email", userController.getProfile);
router.put("/:email", upload.single('userImage'),userController.updateProfile);

module.exports = router;
