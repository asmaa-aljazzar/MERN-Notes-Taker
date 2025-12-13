import mongoose from "mongoose";

// 1- create a schema.
// 2- model based off of that schema.

const noteSchema = new mongoose.Schema ({
	title: {
		type:String,
		required: true,
		trim: true,
	},
	content:{
		type:String,
		required: true,
		trim: true,
	}
	//! No need to put another properties for Dates.
}, { timestamps: true });// mongoDB will give createdAt, updatedAt

const Note = mongoose.model("Note", noteSchema); // create a note model based on the noteSchema
// so every single note will have all properties.

export default Note;
