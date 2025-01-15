const pool = require('../database/databaseConnection');

const getUserById = async (userId) => {
    const result = await pool.query(
        "SELECT user_name FROM users WHERE user_id = $1",
        [userId]
    );
    return result.rows[0];
}

module.exports = { getUserById };