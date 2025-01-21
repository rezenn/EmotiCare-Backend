const generateJwt = require("../utils/generateJwt");
const { getUserById, Mood } = require("../model/trackerModel");

const getUserInfo = async (req, res) => {
    try {

        const user = await getUserById(req.user);
        const moods = await Mood.getMoodByUser(user);

        if (!user) {
            return res.status(404).json("User not found.")
        }

        res.json(user);
        res.status(200).json(moods)

    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error")
        res.status(500).json({error: "Failed to get mood."})
        

    }
}

const addMood = async (req, res) => {
    try{
        const {moodDate, moodEmoji, moodLabel} = req.body;
        const userId = req.user;

        const newMood = await Mood.addMood(userId, moodDate, moodEmoji,moodLabel);
        res.status(201).json(newMood)
    }catch(error){
        console.error(error.message);
        res.status(500).json({error: "Failed to add mood."});
    }
}

const getMoods = async (req, res) => {
    try {
        const userId = req.user;

        const moods = await Mood.getMoodByUser(userId);
        res.status(200).json(moods)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: "Failed to get mood."})
        
    }
}

module.exports = { getUserInfo, addMood, getMoods };