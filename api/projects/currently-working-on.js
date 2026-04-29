// Vercel API Route: /api/projects/currently-working-on
const wipProjects = [
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

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ data: wipProjects });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}