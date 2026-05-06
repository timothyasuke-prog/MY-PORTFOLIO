import { isAdminAuthorized } from "./_adminAuth.js";
import { addProject, getDoneProjects, validateNewProject } from "./_projectsStore.js";

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ data: getDoneProjects() });
  }

  if (req.method === "POST") {
    if (!isAdminAuthorized(req)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const validated = validateNewProject(req.body || {});
    if (validated.error) {
      return res.status(400).json({ error: validated.error });
    }

    if (validated.data.status !== "done") {
      return res.status(400).json({ error: "Use this endpoint for done projects only." });
    }

    return res.status(201).json({ data: addProject(validated.data) });
  }

  return res.status(405).json({ error: "Method not allowed" });
}