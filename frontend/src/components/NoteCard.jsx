import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom"
import { formatDate } from "../lib/utils.js";
import api from "../lib/axios.js"
import toast from "react-hot-toast";
// because I sent note={note} then must send as {note} so not write note.note.title
const NoteCard = ({ note, setNotes }) => {
	const handleDelete = async (e, id) => {
		e.preventDefault(); // get rid of the navigation behavior.
		// If the user does not confirm, stop everything. Do nothing further.
		if (!window.confirm("Are you sure to delete this note?")) return;
		// if conformed
		try {
			await api.delete(`/notes/${id}`);
			// update setNotes state
			// all previous notes but filter out the one we have deleted
			setNotes((prev) => prev.filter(note => note._id !== id)); // get any node that not the same deleted one 
			toast.success("Note deleted successfully");
		} catch (error) {
			toast.error("Failed to delete note");
			console.error("Error in handleDelete", error);

		}
	}
	// To see a readable date
	return (
		// when we click on the note it will take us to the note page
		<Link to={`/note/${note._id}`}
			className="card bg-base-100 hover:shadow-lg hover:bg-base-200 transition-all duration-200 
			border-t-4 border-solid border-[#00FF9D]"
		>
			<div className="card-body">
				<h3 className="card-title text-based-content">{note.title}</h3>
				<p className="text-base-content/70 line-clamp-3">{note.content}</p>
				<div className="card-actions justify-between items-center mt-4">
					<span className="text-sm text-base-content/60">
						{formatDate(new Date(note.createdAt))}
					</span>
					<div className="flex items-center gap-1">
						<button className="btn btn-ghost btn-xs text-success" >
							<PenSquareIcon className="size-4" />
						</button>
						<button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, note._id)}>
							<Trash2Icon className="size-4" />
						</button>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default NoteCard