const Notes = require("../model/NotesModel"); 
const createNote = async (req, res) => {
    try {
        const { noteDesc } = req.body;
        const userId = req.user;
        const note = await Notes.addNotes(userId, noteDesc); 
        res.status(201).json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to add note." });
    }
};

const getNote = async (req, res) => {
    try {
        const userId = req.user;
        const notes = await Notes.getNotes(userId); 
        res.status(200).json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to get notes." });
    }
};

const updateNote = async (req, res) => {
    try {
        const { noteId, noteDesc } = req.body;
        const userId = req.user;

        const updatedNote = await Notes.updateNotes( noteDesc, userId);
        if (!updatedNote) {
            return res.status(404).json({ error: "Note not found or user not authorized." });
        }

        res.status(200).json(updatedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to update note." });
    }
};

module.exports = { createNote, getNote, updateNote };