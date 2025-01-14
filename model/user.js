const pool = require("../database/databaseConnection");

class User {
    static async findByEmail(email) {
        const result = await pool.query(
            "SELECT * FROM users WHERE user_email = $1", [email]
        );
        return result.rows[0];
    }

    static async create({ name, email, password }) {
        const result = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1 , $2, $3) RETURNING *", [name, email, password]
        );

        return result.rows[0];
    }
}

module.exports = User;