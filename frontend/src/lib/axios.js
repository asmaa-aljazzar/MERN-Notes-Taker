import axios from "axios";

// create an axios instance
const api = axios.create ({
	baseURL: "http://localhost:5001/api",
});

export default api;