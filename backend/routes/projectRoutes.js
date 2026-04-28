const express = require("express");
const router = express.Router();
const {
  getAllProjects,
  getFeaturedProjects,
  getProjectById,
  getCurrentlyWorkingOn,
} = require("../controllers/projectsController");

router.get("/", getAllProjects);
router.get("/featured", getFeaturedProjects);
router.get("/:id", getProjectById);
router.get("/currently/working-on", getCurrentlyWorkingOn);

module.exports = router;