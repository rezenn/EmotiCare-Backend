const pool = require('../database/DatabaseConnection');

class Notes {
    static async addNotes(userId, noteDesc) {
        const result = await pool.query(
            "INSERT INTO notes (user_id, note_desc) VALUES ($1, $2) RETURNING *",
            [userId, noteDesc]
        );
        return result.rows[0];
    }

    static async getNotes(userId) {
        const result = await pool.query(
            "SELECT note_id, note_desc FROM notes WHERE user_id = $1",
            [userId]
        );
        return result.rows;
    }

    static async updateNotes( noteDesc, userId) {
        const result = await pool.query(
            "UPDATE notes SET note_desc = $1 WHERE user_id = $2 RETURNING *",
            [noteDesc, userId]
        );
        return result.rows[0];
    }
}

module.exports = Notes; // Export the Notes class