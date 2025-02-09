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
              c.CreatedBy = $1`, // Only challenges created by the user
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
        // Check if user already has daily challenges stored for today
        const checkExisting = await pool.query(
            `SELECT challenges, last_updated 
             FROM daily_challenges 
             WHERE user_id = $1 
             AND last_updated >= NOW() - INTERVAL '1 day'`,
            [userID]
        );

        if (checkExisting.rowCount > 0) {
            return checkExisting.rows[0].challenges; // Return cached challenges
        }

        // If no existing challenges, generate new ones
        const result = await pool.query(
            `SELECT 
                c.challenge_id, 
                c.title, 
                c.IsPreloaded, 
                c.CreatedBy, 
                COALESCE(uc.IsDone, FALSE) AS isdone
            FROM 
                challenges c 
            LEFT JOIN 
                userChallenges uc 
            ON 
                c.challenge_id = uc.challenge_id 
            AND 
                uc.user_id = $1 
            WHERE 
                (c.IsPreloaded = TRUE OR c.CreatedBy = $1) 
                AND (uc.IsDone IS NULL OR uc.IsDone = FALSE)
            ORDER BY RANDOM() 
            LIMIT 7`,
            [userID]
        );

        const dailyChallenges = result.rows;

        await pool.query(
            `INSERT INTO daily_challenges (user_id, challenges, last_updated) 
             VALUES ($1, $2, NOW()) 
             ON CONFLICT (user_id) DO UPDATE 
             SET challenges = EXCLUDED.challenges, last_updated = NOW()`,
            [userID, JSON.stringify(dailyChallenges)]
        );

        return dailyChallenges;
    } catch (error) {
        console.error(error.message);
        throw new Error("Failed to fetch daily challenges.");
    }
}


static async markChallengeAsDone(userID, challengeID) {
  try {
    // Check if the user has the challenge in the userChallenges table
    const challengeCheck = await pool.query(
      "SELECT * FROM userChallenges WHERE user_id = $1 AND challenge_id = $2",
      [userID, challengeID]
    );

    if (challengeCheck.rowCount === 0) {
      throw new Error("Challenge not found for the user.");
    }

    // Toggle the challenge status if it exists
    const result = await pool.query(
      "UPDATE userChallenges SET isdone = NOT isdone WHERE user_id = $1 AND challenge_id = $2 RETURNING *",
      [userID, challengeID]
    );

    if (result.rows.length === 0) {
      throw new Error("Failed to toggle challenge status.");
    }

    return result.rows[0]; // Return the updated challenge
  } catch (error) {
    console.error(error.message);
    throw new Error("Failed to mark challenge as done.");
  }
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