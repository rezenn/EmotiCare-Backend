const { getUserById, Mood } = require("../model/TrackerModel");

const getUserInfo = async (req, res) => {
  try {
    const user = await getUserById(req.user);
    if (!user) return res.status(404).json({ error: "User not found." });

    const moods = await Mood.getMoodByUser(req.user);
    res.status(200).json({ user_name: user.user_name, moods });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to retrieve user info." });
  }
};
const getLatestMood = async (req, res) => {
  try {
    const userId = req.user;
    if (!user) return res.status(404).json({ error: "User not found." });

    const moods = await Mood.getLatestMood(userId);
    res.status(200).json( moods );
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to retrieve user info." });
  }
};

const addMood = async (req, res) => {
  try {
    const { moodDate, moodEmoji, moodLabel } = req.body;
    const userId = req.user;

    const result = await Mood.addOrUpdateMood(userId, moodDate, moodEmoji, moodLabel);
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to update mood." });
  }
};

const getMoods = async (req, res) => {
  try {
      const userId = req.user;
      const moods = await Mood.getMoods(userId);
      res.status(200).json(moods);
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to fetch moods." });
  }
};

const countAllMoods = async (req, res) => {
  try {
    const userId = req.user;
    const countMood = await Mood.countAllMoods(userId);
    res.status(200).json({count_mood: parseInt(countMood)});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to count all moods." });
  }
}
const moodStreaks = async (req, res) => {
  try {
    const userId = req.user;
    const allStreaks = await Mood.getCurrentStreak(userId);
    res.status(200).json({streaks: parseInt(allStreaks)});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to get streaks." });
  }
}



module.exports = { getUserInfo,getLatestMood, addMood, getMoods, countAllMoods, moodStreaks };
