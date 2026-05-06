const express = require("express");
const router = express.Router();
const {
  getAllProjects,
  getFeaturedProjects,
  getCurrentlyWorkingOn,
  getProjectById,
  createDoneProject,
  createCurrentlyWorkingOnProject,
} = require("../controllers/projectsController");

router.get("/", getAllProjects);
router.post("/", createDoneProject);
router.get("/featured", getFeaturedProjects);
router.get("/currently/working-on", getCurrentlyWorkingOn);
router.post("/currently/working-on", createCurrentlyWorkingOnProject);
router.get("/:id", getProjectById);

module.exports = router;