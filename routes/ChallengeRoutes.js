const express = require("express");
const router = express.Router();
const {addChallenge, getChallenges, markChallengeAsDone} = require("../controllers/ChallengeControllers");
const authorize = require("../middleware/AuthMiddleware");

router.post('/',authorize, addChallenge);
router.get('/',authorize, getChallenges);
router.patch('/',authorize, markChallengeAsDone);

module.exports = router;
