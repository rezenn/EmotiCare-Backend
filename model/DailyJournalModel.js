const {query} =require('express');
const pool = require('../database/DatabaseConnection');

class Journal{
    static async addJournal(userId, title, description,entry_date, entry_time){
        try {

            const journal = await pool.query(
                "INSERT INTO dailyJournals (user_id, title, description, entry_date, entry_time) VALUES ($1,$2,$3,$4,$5,) RETURNING *",
                [userId,title, description,entry_date, entry_time]
            );
            return result.rows;
        } catch (error) {
            console.error(error.message)
            throw new Error("Failed to add journal.");
        }
    }

    static async getDailyJournal(userId){
        try {
            
        } catch (error) {
            console.error(error.message)
            throw new Error("Failed to fetch journal.");
        }
    }
}