import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";

// local
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import ratelimiter from "./middleware/rateLimiter.js";

//? Endpoint?
//* compination between URL + HTTP method
// 	- that let the client interact with a specific resource.

// Build our app
dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000
const __dirname = path.resolve();

//? middleware
// allows us to get access to the request body values.
//! Cannot access them by default, give undefined. 
// can use a middleware by using use method.
//? middleware example
// app.use ((req, res, next) => {
// 	console.log (`Req method is: ${req.method} & Req url is: ${req.url}`);
// 	next (); // the GET, PUT ... will run after the code above 
// })

app.use(express.json()); // This will parsing the json body
// should be at the first before any api

if (process.env.NODE_ENV !== "production") {

	app.use(cors({ // if without obj it is mean any url
		origin: "http://localhost:5173",
		credentials: true,
	}))
};

app.use(ratelimiter);
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")))
	// Express 5 doesn't accept * so add path 
	app.get("*path", (req, res) => {
		res.status (404).send ("Not Found");
		res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
	})
};

// listen to the server
connectDB().then(() => {
	app.listen(PORT, () => {
		console.log("Server started on PORT: 5001")
	});
});
