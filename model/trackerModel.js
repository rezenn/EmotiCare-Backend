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
}

module.exports = { getUserById,Mood };