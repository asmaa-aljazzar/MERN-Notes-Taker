import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../lib/axios.js"
import toast from "react-hot-toast";
import { LoaderIcon, ArrowLeftIcon, Trash2Icon, Trash2 } from "lucide-react";

const NoteDetailPage = () => {
	// don't initialize it with null
	const [note, setNote] = useState({ title: "", content: "" });
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);
	const [setIsRateLimited] = useState(false);

	const navigate = useNavigate();

	const { id } = useParams();

	const handleDelete = async () => {
		if (!window.confirm("Are you sure you want to delete this note?")) return;
		try {
			api.delete(`/notes/${id}`);
			toast.success("Note deleted successfully");
			navigate("/");
		} catch (error) {
			toast.error("Failed to delete note");
			console.error("Error in handleDelete", error);

		}
	};
	const handleSave = async () => {
		if (!note.title.trim() || !note.content.trim()) {
			toast.error("Please add a title or content");
			return;
		}
		setSaving(true);
		try {
			await api.put  (`/notes/${id}`, note);
			toast.success ("Note updated successfully");
			navigate ("/");
		} catch (error) {
			toast.error("Failed to update note");
			console.error("Error in handleSave", error);
		} finally {
			setSaving(false);
		}
	};

	// whenever the id changed use this effect
	useEffect(() => {

		const fetchNote = async () => {
			try {
				const res = await api.get(`/notes/${id}`);
				setNote(res.data);
			} catch (error) {
				if (error.response.status === 429) // rate limit
					setIsRateLimited(true);
				else {
					toast.error("Failed to fetch the note");
				}
			} finally {
				 setLoading(false);
			}
		};

		fetchNote();
	}, [id])

	if (loading) {
		return (
			<div className="min-h-screen bg-base-200 flex justify-center items-center">
				<LoaderIcon className="animate-spin size-10" />
			</div>
		);
	}

	return (

		<div className="min-h-screen bg-base-200">
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-2xl mx-auto">
					<div className="flex items-center justify-between mb-6">
						<Link to="/" className="btn btn-ghost">
							<ArrowLeftIcon className="h-5 w-5" />
							Back to Notes
						</Link>
						<button onClick={handleDelete} className="btn btn-error btn-outline">
							<Trash2Icon className="h-5 w-5" />
							Delete Note
						</button>
					</div>
					<div className="card bg-base-100 ">
						<div className="card-body">
							<div className="form-control mb-4">
								<lable className="lable">
									<span className="lable-text">Title</span>
								</lable>
								<input type="text"
									placeholder="Note Title"
									className="input input-bordered"
									value={note.title}
									// ...note: take all properties of the obj.
									onChange={(e) => setNote({ ...note, title: e.target.value })}
								/>
							</div>
							<div className="form-control mb-4">
								<lable className="lable">
									<span className="lable-text">Content</span>
								</lable>
								<textarea type="text"
									placeholder="Write your note here..."
									className="input input-bordered h-32"
									value={note.content}
									// e->event = event.title.value
									onChange={(e) => setNote({ ...note, content: e.target.value })}
								/>
							</div>
							<div className="card-actions justify-end">
								<button className="btn btn-primary" disabled={saving} onClick={handleSave}>
									{saving ? "Saving..." : "Save Changes"}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NoteDetailPage;
