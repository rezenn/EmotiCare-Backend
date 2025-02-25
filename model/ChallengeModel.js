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
              c.CreatedBy = $1`, 
            [userID]
          );
      
          return result.rows;
        } catch (error) {
          console.error(error.message);
          throw new Error("Failed to fetch user-created challenges.");
        }
      }
      static async getDailyChallenges(userID) {
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
              c.CreatedBy = $1
          OR IsPreloaded = true`,
            [userID]
          );
      
          return result.rows;
        } catch (error) {
          console.error(error.message);
          throw new Error("Failed to fetch user-created challenges.");
        }
      }

      static async markChallengeAsDone(userID, challengeID) {
        try {
          const challengeResult = await pool.query(
            "SELECT * FROM challenges WHERE challenge_id = $1",
            [challengeID]
          );
      
          if (challengeResult.rowCount === 0) {
            throw new Error("Challenge not found.");
          }
      
          const existingChallenge = await pool.query(
            "SELECT * FROM userChallenges WHERE user_id = $1 AND challenge_id = $2",
            [userID, challengeID]
          );
      
          if (existingChallenge.rowCount === 0) {
            await pool.query(
              "INSERT INTO userChallenges (user_id, challenge_id, isdone) VALUES ($1, $2, true)",
              [userID, challengeID]
            );
            return { success: true, message: "Challenge marked as done." };
          } else {
            const updatedResult = await pool.query(
              "UPDATE userChallenges SET isdone = NOT isdone WHERE user_id = $1 AND challenge_id = $2 RETURNING isdone",
              [userID, challengeID]
            );
            return { success: true, message: "Challenge status updated.", isdone: updatedResult.rows[0].isdone };
          }
        } catch (error) {
          console.error("Error in markChallengeAsDone:", error.message);
          throw new Error("Failed to update challenge status.");
        }
      }
      

  static async deleteChallenge(challengeID) {
        try {
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

  static async countAllChallenge(userId) {
    try {
        const result = await pool.query(
            `SELECT COUNT(*) FROM challenges 
             LEFT JOIN userChallenges uc ON challenges.challenge_id = uc.challenge_id 
             AND uc.user_id = $1 
             WHERE challenges.IsPreloaded = true OR challenges.CreatedBy = $1`,
            [userId]
        );
        return result.rows[0].count;
    } catch (error) {
        console.error(error.message);
        throw new Error("Failed to count all challenges.");
    }
}

static async countAllCompleteChallenge(userId) {
  try {
      const result = await pool.query(
          `SELECT COUNT(*) FROM userChallenges 
          WHERE IsDone = true AND user_id = $1`,
          [userId]
      );
      return result.rows[0].count;
  } catch (error) {
      console.error("Error in countAllCompleteChallenge:", error.message);
      throw new Error("Failed to count completed challenges.");
  }
}

}

module.exports = Challenges;