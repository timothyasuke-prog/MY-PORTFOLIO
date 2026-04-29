import axios from "axios";

const fallbackProjects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website built with React and Node.js",
    techStack: ["React", "Node.js", "Express", "Vite"],
    image: "/portfolio-screenshot.png",
    githubUrl: "https://github.com/timothyasuke-prog/MY-PORTFOLIO",
    liveUrl: "#",
    readme: "This is a portfolio website showcasing my projects and skills."
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment integration",
    techStack: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "/ecommerce-screenshot.png",
    githubUrl: "https://github.com/example/ecommerce",
    liveUrl: "https://example-ecommerce.vercel.app",
    readme: "A complete e-commerce platform with user authentication, product management, and payment processing."
  }
];

const fallbackWipProjects = [
  {
    id: 3,
    title: "AI Chat Application",
    description: "Real-time chat application with AI integration",
    techStack: ["React", "Socket.io", "OpenAI API", "Node.js"],
    image: "/ai-chat-screenshot.png",
    githubUrl: "https://github.com/timothyasuke-prog/ai-chat",
    readme: "An AI-powered chat application with real-time messaging and AI responses."
  },
  {
    id: 4,
    title: "Mobile Fitness App",
    description: "Cross-platform mobile app for fitness tracking",
    techStack: ["React Native", "Firebase", "Health API"],
    image: "/fitness-app-screenshot.png",
    githubUrl: "https://github.com/timothyasuke-prog/fitness-app",
    readme: "A mobile fitness tracking app with workout plans and progress monitoring."
  }
];

const API = axios.create({
  baseURL: import.meta.env.PROD ? "/api" : "http://localhost:5000/api",
  withCredentials: true
});

const fallbackResponse = (data) => ({ data: { data } });

const withProductionFallback = (request, data) =>
  request.catch((error) => {
    if (import.meta.env.PROD) {
      return fallbackResponse(data);
    }
    throw error;
  });

export const fetchProjects = () => withProductionFallback(API.get("/projects"), fallbackProjects);
export const fetchFeaturedProjects = () => API.get("/projects/featured");
export const fetchProjectById = (id) => API.get(`/projects/${id}`);
export const fetchCurrentlyWorkingOn = () =>
  withProductionFallback(API.get("/projects/currently/working-on"), fallbackWipProjects);
export const sendContactMessage = (data) => API.post("/contact", data);
