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
  try {
    const updatedChallenge = await Challenges.markChallengeAsDone(userId, challengeID);
    res.json({ message: "Challenge toggled successfully.", challenge: updatedChallenge });
  } catch (error) {
    console.error(error.message);
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
      res.status(200).json({ 
      message: "Challenge deleted successfully.", 
      challenge: deletedChallenge 
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to delete challenge." });
  }
};

const countAllChallenge = async (req, res) => {
  try {
    const userId = req.user;
    const countChallenge = await Challenges.countAllChallenge(userId);
    res.status(200).json({count_challenges: parseInt(countChallenge)});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to count all challenges." });
  }
};

const countAllCompleteChallenge = async (req, res) => {
  try {
      const userId = req.user;
      const countCompleteChallenge = await Challenges.countAllCompleteChallenge(userId);
      res.status(200).json({ count_complete_challenges: parseInt(countCompleteChallenge) });
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to count completed challenges." });
  }
};
module.exports ={ getChallenges,
  getDailyChallenges,
   addChallenge, 
   markChallengeAsDone,
    deleteChallenge,
  countAllChallenge,
countAllCompleteChallenge}