import { isAdminAuthorized } from "../_adminAuth.js";
import { updateMessageStatus } from "../_messagesStore.js";

export default function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!isAdminAuthorized(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.query;
  const { status } = req.body || {};

  if (!id) {
    return res.status(400).json({ error: "Message id is required." });
  }

  if (!["new", "replied"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value." });
  }

  const updated = updateMessageStatus(id, status);
  if (!updated) {
    return res.status(404).json({ error: "Message not found." });
  }

  return res.status(200).json({ data: updated });
}
