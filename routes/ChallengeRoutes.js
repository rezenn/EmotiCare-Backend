const express = require("express");
const router = express.Router();
const { addChallenge, 
    getChallenges, 
    getDailyChallenges,
    markChallengeAsDone, 
    deleteChallenge, countAllChallenge, countAllCompleteChallenge } = require("../controllers/ChallengeControllers");
const authorize = require("../middleware/AuthMiddleware");

router.post('/add', authorize, addChallenge); 
router.get('/all', authorize, getChallenges); 
router.get('/daily', authorize, getDailyChallenges); 
router.delete('/delete/:challengeID', authorize, deleteChallenge); 
router.patch('/mark-done', authorize, markChallengeAsDone); 
router.get("/countChallenge", authorize, countAllChallenge);
router.get("/countCompleteChallenge", authorize, countAllCompleteChallenge);

module.exports = router;