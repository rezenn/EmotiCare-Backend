const pool = require('../database/DatabaseConnection');

class Journal {
    static async addJournal(userId, title, description, entry_date, entry_time) {
        try {
            const journal = await pool.query(
                "INSERT INTO dailyJournals (user_id, title, description, entry_date, entry_time) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [userId, title, description, entry_date, entry_time]
            );
            return journal.rows; // Fixed variable name
        } catch (error) {
            console.error(error.message);
            throw new Error("Failed to add journal.");
        }
    }

    static async getDailyJournal(userId) {
        try {
            const journal = await pool.query(
                "SELECT title, description, entry_date, entry_time FROM dailyJournals WHERE user_id = $1 ORDER BY entry_date DESC, entry_time DESC;",
                [userId]
            );
            return journal.rows; // Fixed variable name
        } catch (error) {
            console.error(error.message);
            throw new Error("Failed to fetch journal.");
        }
    }
    static async countAllJournal(userId){
        try {
            const result = await pool.query("SELECT COUNT(*) FROM dailyJournals WHERE user_id = $1",
                [userId]
            );
            return result.rows[0].count;

        } catch (error) {
            console.error(error.message);
            throw new Error("Failed to count all journal.");
        }
    }
}

module.exports = Journal;
