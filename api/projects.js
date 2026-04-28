const {
  getAllProjects,
  getFeaturedProjects,
  getProjectById,
  getCurrentlyWorkingOn,
} = require("../backend/controllers/projectsController");

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const projects = getAllProjects();
      res.status(200).json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};