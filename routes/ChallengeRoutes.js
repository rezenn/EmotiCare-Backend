const express = require("express");
const router = express.Router();
const { addChallenge, 
    getChallenges, 
    markChallengeAsDone, 
    deleteChallenge } = require("../controllers/ChallengeControllers");
const authorize = require("../middleware/AuthMiddleware");

router.post('/add', authorize, addChallenge); 
router.get('/all', authorize, getChallenges); 
router.delete('/delete/:challengeID', authorize, deleteChallenge); 
router.patch('/mark-done', authorize, markChallengeAsDone); 

module.exports = router;