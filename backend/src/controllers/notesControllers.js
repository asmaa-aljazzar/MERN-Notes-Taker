import Note from "../models/Note.js"
import mongoose from "mongoose";
// We will use this functions to controll REST API behaviors in the ./routes/notesRoutes.js file
export const getAllNotes = async (_, res) => {
	try {
		// fetch every note
		// can add a specific filter inside find like {...}
		// if empty it is mean every single one
		const notes = await Note.find().sort ({createdAt: -1}); // newest first (reversed order).
		res.status(200).json(notes);
	} catch (error) {
		console.error("Error in getAllNotes controller:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const getNoteById = async (req, res) => {
	try {
		const { id } = req.params;

		if (!mongoose.Types.ObjectId.isValid(id))
			res.status(400).json("Note not found");
		const note = await Note.findById(id);
		res.status(200).json(note);
	} catch (error) {
		console.error("Error in getAllNotes controller:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const createNote = async (req, res) => {
	try {
		// to create a note they need a title and the content.
		const { title, content } = req.body
		// {title: title, content: content} but because of same name,
		// we shorted it.
		const note = new Note({ title, content });
		const savedNote = await note.save();
		res.status(201).json(savedNote);
	} catch (error) {
		console.log("Error in createNote controller:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const updateNote = async (req, res) => {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id))
			return res.status(400).json({ message: "Note not found!" });
		const { title, content } = req.body;
		// validate ID format before touching DB
		// should find the id to update and this is how we know
		// the sec param is what we need to update
		const updatedNote = await Note.findByIdAndUpdate(
			id,
			{ title, content },
			{ new: true }); // return a new node with updated fields

		// if id is wrong
		if (!updatedNote) return (res.status(404).json({ message: "Note not found!" }));

		res.status(200).json(updatedNote);
	} catch (error) {
		console.log("Error in updateNote controller:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const deleteNote = async (req, res) => {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id))
			return res.status(400).json({ message: "Note not found!" });
		const deletedNote = await Note.findByIdAndDelete(id);
		if (!deletedNote) return req.status(404).json({ message: "Note not found!" });
		// if i did not send a status it will be 200 by default
		res.status(200).json({ message: "Note deleted successfully!" });
	}
	catch (error) {
		console.log("Error in deleteNote controller:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
