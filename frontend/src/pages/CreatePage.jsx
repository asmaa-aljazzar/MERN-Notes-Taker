import { ArrowLeftCircleIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios.js";

const CreatePage = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	// When I click submit it will refresh the page by default but if i don't want it we need to preventDefault
	const handleSubmit = async (e) => {
		e.preventDefault();
		// send request after some validation
		if (!title.trim() || !content.trim()) {
			toast.error("All fields are required");
			return;
		}
		setLoading(true);
		try {
			await api.post("/notes", {
				title,
				content
			});
			toast.success("Note Created Successfully");
			// navigate user to the home page
			navigate("/");
		} catch (error) {
			console.log("Error creating note", error);
			if (error.response.status === 429) {
				toast.error("Slow down! You're creating notes too fast", {
					duration: 4000,
					icon: "💀",
				});
			}
			else
				toast.error("Faild to create note");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-base-200">
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-2xl mx-auto">
					<Link to={"/"} className="btn btn-ghost mb-b">
						<ArrowLeftCircleIcon className="size-5" />
						Back to Notes
					</Link>
					<div className="card bg-base-100">
						<div className="card-body">
							<div className="card-title text-2x mb-4">Create New Note</div>
							<form onSubmit={handleSubmit}>
								<div className="form-control mb-4">
									<lable className="lable">
										<span className="lable-text">Title</span>
									</lable>
									<input type="text"
										placeholder="Note Title"
										className="input input-bordered"
										value={title}
										// e->event = event.title.value
										onChange={(e) => setTitle(e.target.value)}
									/>
								</div>
								<div className="form-control mb-4">
									<lable className="lable">
										<span className="lable-text">Content</span>
									</lable>
									<textarea type="text"
										placeholder="Write your note here..."
										className="input input-bordered h-32"
										value={content}
										// e->event = event.title.value
										onChange={(e) => setContent(e.target.value)}
									/>
								</div>
								<div className="card-actions justify-end">
									{/* The boutton will be disabled if we are in the loading state*/}
									<button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Creating..." : "Create Note"}</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreatePage;