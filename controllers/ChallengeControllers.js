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
const getDailyChallenges = async (req, res) => {
    const userId = req.user;

    try {
        const getChallenges = await Challenges.getDailyChallenges(userId);
        res.json(getChallenges);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: "Failed to fetch Challenge"})
    }
}

const markChallengeAsDone = async (req, res) => {
  const { challengeID } = req.body;
  const userId = req.user;

  console.log(`Marking challenge as done: User ID - ${userId}, Challenge ID - ${challengeID}`);

  try {
    const updatedChallenge = await Challenges.markChallengeAsDone(userId, challengeID);
    res.json({ message: "Challenge toggled successfully.", challenge: updatedChallenge });
  } catch (error) {
    console.error("Error occurred while toggling challenge:", error.message);
    res.status(500).json({ error: "Failed to toggle challenge status." });
  }
};


  const deleteChallenge = async (req, res) => {
    const { challengeID } = req.params;
    const userId = req.user;
  
    try {
      const deletedChallenge = await Challenges.deleteChallenge(challengeID);
  
      if (!deletedChallenge) {
        return res.status(404).json({ error: "Challenge not found." });
      }
  
      // Success response
      res.status(200).json({ 
        message: "Challenge deleted successfully.", 
        challenge: deletedChallenge 
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to delete challenge." });
    }
  };
module.exports ={ getChallenges,
  getDailyChallenges,
   addChallenge, 
   markChallengeAsDone,
    deleteChallenge}