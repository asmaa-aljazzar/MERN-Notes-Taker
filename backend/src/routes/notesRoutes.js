import express from "express"
import { getAllNotes, createNote, updateNote, deleteNote, getNoteById} from "../controllers/notesControllers.js";


const router = express.Router();

// API
// routes

// will use getAllNotes controller function with a specific route 
// when get method is used
router.get("/", getAllNotes);

router.get("/:id", getNoteById);

router.post ("/", createNote);

router.put ("/:id", updateNote);

router.delete ("/:id", deleteNote);



export default router;