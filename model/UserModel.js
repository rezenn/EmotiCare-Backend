const pool = require("../database/DatabaseConnection");

class User {
    static async getUserById (userId){
        const result = await pool.query(
            "SELECT user_name, user_email FROM users WHERE user_id = $1", // Include user_email
            [userId]
        );
        return result.rows[0];
    };
    static async findByEmail(email) {
        const result = await pool.query(
            "SELECT * FROM users WHERE user_email = $1", [email]
        );
        return result.rows[0];
    }
    static async createdDate(email) {
        const result = await pool.query(
            "SELECT created_at FROM users WHERE user_email = $1", [email]
        );
        return result.rows[0];
    }

    static async create({ name, email, password }) {
        const result = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1 , $2, $3) RETURNING *", [name, email, password]
        );

        return result.rows[0];
    }

    static async updatePassword({ email, password}){
        const result = await pool.query(
            "UPDATE users SET user_password = $1 WHERE user_email = $2 RETURNING *", [password, email]
        );
        return result.rows[0];
    }

    static async getProfile({ email }) {
        const result = await pool.query(
            "SELECT user_name, full_name, birthday, gender, profile_picture_url, user_email, created_at FROM users WHERE user_email = $1",
            [email]
        );
        return result.rows[0];
    }
    
    static async updateProfile({ user_name, full_name, birthday, gender, profile_picture_url, email }) {
        const result = await pool.query(
            "UPDATE users SET user_name = $1, full_name = $2, birthday = $3, gender = $4, profile_picture_url = $5 WHERE user_email = $6 RETURNING user_name, full_name, birthday, gender, profile_picture_url, user_email",
            [user_name, full_name, birthday, gender, profile_picture_url, email]
        );
        return result.rows[0];
    }
    
    static async deleteUser({email}){
        const result = await pool.query(
            "DELETE FROM users WHERE user_email = $1 RETURNING *",[email]
        );
        return result.rows[0];
    }
}

module.exports = User;