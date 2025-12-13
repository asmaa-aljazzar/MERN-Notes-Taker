import { NotebookIcon } from "lucide-react"
import { Link } from "react-router-dom"

const NotesNotFound = () => {
  return (
	<div className="flex flex-col items-center justify-center py-16 mx-auto space-y-6 max-w-md text-center">
		<div className="bg-primary/10 rounded-full p-8">
		<NotebookIcon className="size-10 text-primary"></NotebookIcon>
		</div>
		<h1 className="text-2xl font-bold">No notes yet</h1>
		<p className="textbase-content/70">
			Ready to organize your thoughts? Create your first note to get started on your journey.
		</p>
		<Link to="/create" className="btn btn-primary">Create Your First Note</Link>
	</div>
);
};

export default NotesNotFound