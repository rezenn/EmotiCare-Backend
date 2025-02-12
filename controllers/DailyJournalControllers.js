const Journal = require('../model/DailyJournalModel');

const addDailyJournal = async (req, res) => {
    const { title, description, entry_date, entry_time } = req.body;
    const userId = req.user;

    // Check if any required field is missing
    if (!userId || !title || !description || !entry_date || !entry_time) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const journal = await Journal.addJournal(userId, title, description, entry_date, entry_time);
        res.status(201).json(journal);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to add Daily Journal" });
    }
};


const getDailyJournal = async (req, res) => {
    try {
        const userId = req.user;
        const journal = await Journal.getDailyJournal(userId);
        res.status(200).json(journal);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to get journal." });
    }
}
const countAllJournal = async (req, res) => {
    try {
      const userId = req.user;
      const journal = await Journal.countAllJournal(userId);
      res.status(200).json({count_journal: parseInt(journal)});
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to count all journal." });
    }
  }

module.exports = {addDailyJournal, getDailyJournal, countAllJournal};