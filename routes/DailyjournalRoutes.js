const express = require("express");
const router = express.Router();
const {addDailyJournal, 
    getDailyJournal} = require("../controllers/DailyJournalControllers");
const authorize = require("../middleware/AuthMiddleware");

router.post('/', authorize, addDailyJournal);
router.get('/', authorize,getDailyJournal);

module.exports = router;