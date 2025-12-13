import axios from "axios";

// create an axios instance
const BACE_URL = import.meta.env.MODE === "development"? "http://localhost:5001/api" : "/api"
const api = axios.create ({
	baseURL: BACE_URL,
});

export default api;