const { query } = require('express');
const pool = require('../database/DatabaseConnection');

class Challenges{
    static async addChallenges( title, isPreloaded, createdBy){
        const result = await pool.query(
            "INSERT INTO challenges (title, IsPreloaded, CreatedBy) VALUES ( $1, $2, $3) RETURNING *",[title, isPreloaded, createdBy]
        );
        return result.rows[0];
    }

    static async getChallenges(userID){
        const result = await pool.query(
            "SELECT * FROM challenges WHERE IsPreloaded = TRUE OR CreatedBy = $1",[userID]
        );
        return result.rows;
    }

    static async markChallengeAsDone(userID, challengeID){
        const result = await pool.query(
            "UPDATE userChallenges SET IsDone = TRUE WHERE user_id = $1 AND challenge_id = $2",[userID,challengeID]
        )
    }

    static async getDailyChallenges(userID){
        const result = await pool.query(
            "SELECT c.* FROM dailyChallenges dc JOIN challenges c ON dc.challenge_id = c.challenge_id WHERE dc.user_id = $1 AND dc.date_selected = CURRENT_DATE",[userID]
        );
        return result.rows;
    }
}

module.exports = Challenges;