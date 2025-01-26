const express = require("express");
const router = express.Router();
const {getNote, createNote, updateNote} = require("../controllers/notesControllers");
const authorize = require("../middleware/AuthMiddleware");

router.get("/", authorize,getNote);
router.post("/",authorize,createNote);
router.put("/",authorize,updateNote);

module.exports = router;