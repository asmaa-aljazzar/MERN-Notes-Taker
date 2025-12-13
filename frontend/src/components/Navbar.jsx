import { Link } from "react-router-dom"
import { PlusIcon } from "lucide-react"

const Navbar = () => {
	return (
		//  the nav itself
		<header className="bg-base-300 border-b border-base-content/10">
			 {/* margen and width */}
			<div className="mx-auto max-w-6xl p-4">
				{/* display */}
				<div className="flex items-center justify-between">
					 {/* items inside */}
					<h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
						Notes-taker
					</h1>
					{/*  display of the links */}
					<div className="flex items-center gap-4">
						<Link to={"/create"} className="btn btn-primary" >
						{/* add icon */}
						{/* size-5 === h-5 w-5 */}
						<PlusIcon className="size-5"/>
						<span>New note</span>
						</Link>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Navbar