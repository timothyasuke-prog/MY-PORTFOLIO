import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const fetchProjects = () => API.get("/projects");
export const fetchFeaturedProjects = () => API.get("/projects/featured");
export const fetchProjectById = (id) => API.get(`/projects/${id}`);
export const fetchCurrentlyWorkingOn = () => API.get("/projects/currently/working-on");
export const sendContactMessage = (data) => API.post("/contact", data);