import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import NoteCard from "../components/NoteCard.jsx";
import RateLimitedUI from "../components/RateLimitedUI.jsx";
import NotesNotFound from "../components/NotesNotFound.jsx";
// import axios from "axios";
import api from "../lib/axios.js"
import toast from "react-hot-toast";

const HomePage = () => {
	// create a new state for rate limit
	const [isRateLimited, setIsRateLimited] = useState(false);

	// fetch notes state
	const [notes, setNotes] = useState([]); // this state must updated when delete

	// loding state
	const [loading, setLoading] = useState(false);

	// useEffect tells react: run this code after the component renders.”
	// The function inside () => { /* code */ } → the code you want to run.
	// The empty array [] → called the dependency array:
	useEffect(() => {
		const fetchNotes = async () => {
			try {

				// send get req to get all notes
				//! const res = await fetch ("http://localhost:3002/api/notes");
				//! const data = await res.json ();

				// using axios
				const res = await api.get ("/notes"); // prefix with http://localhost:5001/api
				console.log (res.data);

				setNotes(res.data);
				setIsRateLimited (false); // if we are able to get data then not rate limit.
			} catch (error) {
				console.error ("Error fetching notes:");

				// rate limit state
				if (error.response.status === 429) // rate limit
					setIsRateLimited (true);
				else
					toast.error ("Faild to load notes");
			}
			finally {
				setLoading (false);
			}
		};
		fetchNotes();
	}, []);

	return (

		// min-h-screen to make anything fill the entire screen
		<div className="min-h-screen">
			<Navbar />

			{isRateLimited && <RateLimitedUI />}

			{/* loading component */}
			<div className="max-w-7xl mx-auto p-4 mt-6">
				{loading && <div className="text-center text-primary text-lg py-10">Loading notes...</div>}
				{notes.length === 0 && !isRateLimited && <NotesNotFound />}
				{/* Notes */}
				{notes.length > 0 && !isRateLimited && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{/* display the notes */}
						{notes.map ((note) => (
							// display spicific note based on id while mapping
							// pass the note itself as a param
							<NoteCard key={note._id} note={note} setNotes={setNotes}/>
						))}
					</div>
				)}
			</div>

		</div>
	)
}

export default HomePage;
