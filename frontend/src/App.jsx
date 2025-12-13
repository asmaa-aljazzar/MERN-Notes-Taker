import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage.jsx"
import CreatePage from "./pages/CreatePage.jsx"
import NoteDetailPage from "./pages/NoteDetailPage.jsx"

const App = () => {
	return (
		// set the theme here
		// without the data-theme if there is one theme in tailwind it will automatically used
		<div className="relative h-w-full"> 
			<div className="absolute inset-0 -z-10 min-h-screen w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]"/>
			<Routes>
				{/* route 1 */}
				{/* if we visit this path return the element HomePage */}
				<Route path="/" element={ <HomePage /> } />
				{/* route 2 */}
				<Route path="/create" element={ <CreatePage /> } />
				{/* route 3 */}
				<Route path="/note/:id" element={ <NoteDetailPage /> } />
			</Routes>
		</div>
	)
}

export default App;
