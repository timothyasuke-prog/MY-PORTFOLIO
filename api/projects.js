// Vercel API Route: /api/projects
const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website built with React and Node.js",
    techStack: ["React", "Node.js", "Express", "Vite"],
    image: "/portfolio-screenshot.png",
    githubUrl: "https://github.com/timothyasuke-prog/MY-PORTFOLIO",
    liveUrl: "https://my-portfolio-nine-swart-31.vercel.app/",
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

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ data: projects });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}