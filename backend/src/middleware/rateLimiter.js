// TODO: Study this more...

import ratelimit from "../config/upstash.js";

const ratelimiter  = async (req, res, next) => {
	try {
		const { success } = await ratelimit.limit ("my-rate-limit"); // when authentication will set uid in limit
		if (!success)
			return res.status (429).json ({
		message: "Too many requests, please try again later"});
		next ();
	} catch (error){
		console.error ("Rate limit error", error);
		next (error);
	}

}

export default ratelimiter;