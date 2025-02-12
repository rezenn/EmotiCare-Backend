const express = require("express");
const router = express.Router();
const {addDailyJournal, 
    getDailyJournal, countAllJournal} = require("../controllers/DailyJournalControllers");
const authorize = require("../middleware/AuthMiddleware");

router.post('/', authorize, addDailyJournal);
router.get('/', authorize,getDailyJournal);
router.get("/countJournal", authorize, countAllJournal);

module.exports = router;