const { query } = require('express');
const pool = require('../database/DatabaseConnection');

class Challenges{
    static async addChallenges(title, isPreloaded, createdBy) {
        try {
          const challengeResult = await pool.query(
            "INSERT INTO challenges (title, IsPreloaded, CreatedBy) VALUES ($1, $2, $3) RETURNING *",
            [title, isPreloaded, isPreloaded ? null : createdBy]
          );
      
          const challenge = challengeResult.rows[0];
      
          if (!isPreloaded && createdBy) {
            await pool.query(
              "INSERT INTO userChallenges (user_id, challenge_id, IsDone) VALUES ($1, $2, $3)",
              [createdBy, challenge.challenge_id, false]
            );
          }
      
          return challenge;
        } catch (error) {
          console.error(error.message);
          throw new Error("Failed to add challenge.");
        }
      }

      static async getChallenges(userID) {
        try {
          const result = await pool.query(
            `SELECT 
              c.challenge_id, 
              c.title, 
              c.IsPreloaded, 
              c.CreatedBy, 
              uc.IsDone AS isdone 
            FROM 
              challenges c 
            LEFT JOIN 
              userChallenges uc 
            ON 
              c.challenge_id = uc.challenge_id 
            AND 
              uc.user_id = $1 
            WHERE 
              c.IsPreloaded = TRUE 
            OR 
              c.CreatedBy = $1`,
            [userID]
          );
      
          return result.rows;
        } catch (error) {
          console.error(error.message);
          throw new Error("Failed to fetch challenges.");
        }
      }

    static async markChallengeAsDone(userID, challengeID) {
        try {
          const result = await pool.query(
            "UPDATE userChallenges SET IsDone = NOT IsDone WHERE user_id = $1 AND challenge_id = $2 RETURNING *",
            [userID, challengeID]
          );
      
          if (result.rows.length === 0) {
            throw new Error("Challenge not found for the user.");
          }
      
          return result.rows[0];
        } catch (error) {
          console.error(error.message);
          throw new Error("Failed to mark challenge as done.");
        }
      }

    static async getDailyChallenges(userID){
        const result = await pool.query(
            "SELECT c.* FROM dailyChallenges dc JOIN challenges c ON dc.challenge_id = c.challenge_id WHERE dc.user_id = $1 AND dc.date_selected = CURRENT_DATE",[userID]
        );
        return result.rows;
    }
    static async deleteChallenge(challengeID) {
        try {
          // Start a transaction for  atomicity
          await pool.query('BEGIN');
      
          await pool.query(
            "DELETE FROM userChallenges WHERE challenge_id = $1",
            [challengeID]
          );
      
          const result = await pool.query(
            "DELETE FROM challenges WHERE challenge_id = $1 RETURNING *",
            [challengeID]
          );
          await pool.query('COMMIT');
                return result.rows[0];
        } catch (error) {
          await pool.query('ROLLBACK');
          console.error(error.message);
          throw new Error("Failed to delete challenge.");
        }
      }
}

module.exports = Challenges;