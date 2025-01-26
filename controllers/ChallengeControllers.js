const Challenges = require('../model/ChallengeModel');

const addChallenge = async (req, res) => {
    const {title, isPreloaded} = req.body;
    const userId = req.user;

    try {
        const challenge = await Challenges.addChallenges(title,isPreloaded, isPreloaded ? null: userId);
        res.status(201).json(challenge);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: "Failed to add Challenge"})
    }
}

const getChallenges = async (req, res) => {
    const userId = req.user;

    try {
        const getChallenges = await Challenges.getChallenges(userId);
        res.json(getChallenges);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: "Failed to fetch Challenge"})
    }
}

const markChallengeAsDone = async (req,res) => {
    const {challenge_id} = req.body;
    const userId = req.user;

    try {
        const markChallenge = await Challenges.markChallengeAsDone(userId,challenge_id);
        res.json({message: "Challenge is marked done."})
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: "Failed to mark Challenges as done"})
    }
}

module.exports ={ getChallenges, addChallenge, markChallengeAsDone}