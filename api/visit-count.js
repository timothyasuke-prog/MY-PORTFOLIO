import { getVisitCount } from "./_visitStore.js";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    return res.status(200).json(getVisitCount());
  } catch {
    return res.status(500).json({ error: "Unable to load visit count." });
  }
}
