const { getCurrentlyWorkingOn } = require("../../backend/controllers/projectsController");

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const projects = getCurrentlyWorkingOn();
      res.status(200).json({ data: projects });
    } catch (error) {
      console.error('Error fetching currently working on projects:', error);
      res.status(500).json({ error: 'Failed to fetch currently working on projects' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};