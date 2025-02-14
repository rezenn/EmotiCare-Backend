const pool = require('../database/DatabaseConnection');

const getUserById = async (userId) => {
    const result = await pool.query(
        "SELECT user_name FROM users WHERE user_id = $1",
        [userId]
    );
    return result.rows[0];
}

class Mood  {
    static async addMood(userId, date, emoji, label){
        const result = await pool.query(        
            "INSERT INTO moods (user_id, mood_date, mood_emoji, mood_label) VALUES ($1, $2, $3, $4) RETURNING *", 
            [userId, date, emoji, label]
        );
        return result.rows[0];
    }

    static async  getMoodByUser(userId){
        const result = await pool.query(
            "SELECT mood_date, mood_emoji, mood_label FROM moods WHERE user_id = $1 ORDER BY mood_date ASC", [userId]
        );
        return result.rows;
    }

    static async  getLatestMood(userId){
        const result = await pool.query(
            "SELECT mood_date, mood_emoji, mood_label FROM moods WHERE user_id = $1 ORDER BY mood_date DESC LIMIT 1", [userId]
        );
        return result.rows;
    }


    static async getMoods(userId) {
        const result = await pool.query(
            "SELECT * FROM moods WHERE user_id = $1",
            [userId]
        );
        return result.rows;
    }
    static async addOrUpdateMood(userId, date, emoji, label) {
        const existingMood = await pool.query(
            "SELECT * FROM moods WHERE user_id = $1 AND mood_date = $2",
            [userId, date]
        );
    
        if (existingMood.rows.length > 0) {
            if (existingMood.rows[0].mood_emoji === emoji) {
                // If the same mood is selected, delete the mood
                await pool.query("DELETE FROM moods WHERE user_id = $1 AND mood_date = $2", [userId, date]);
                return { message: "Mood deleted" };
            } else {
                // If a different mood is selected, update the mood
                const result = await pool.query(
                    "UPDATE moods SET mood_emoji = $1, mood_label = $2 WHERE user_id = $3 AND mood_date = $4 RETURNING *",
                    [emoji, label, userId, date]
                );
                return result.rows[0];
            }
        } else {
            // If no mood exists, insert a new one
            const result = await pool.query(
                "INSERT INTO moods (user_id, mood_date, mood_emoji, mood_label) VALUES ($1, $2, $3, $4) RETURNING *",
                [userId, date, emoji, label]
            );
            return result.rows[0];
        }
    }
    static async countAllMoods(userId) {
        const result = await pool.query("SELECT COUNT(*) FROM moods WHERE user_id = $1",
             [userId]
            );
            return result.rows[0].count;
    }
    static async getCurrentStreak(userId) {
        const result = await pool.query(`
            WITH consecutive_dates AS (
                SELECT 
                    mood_date,
                    LAG(mood_date) OVER (ORDER BY mood_date) AS prev_date
                FROM moods
                WHERE user_id = $1
            )
            SELECT COUNT(*)  AS streak
            FROM consecutive_dates
            WHERE mood_date = prev_date + INTERVAL '1 day'
               OR prev_date IS NULL;
        `, [userId]);
    
        return result.rows[0].streak;
    }
    
    
}

module.exports = { getUserById,Mood };