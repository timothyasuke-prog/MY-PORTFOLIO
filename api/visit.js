import { incrementVisitCount } from "./_visitStore.js";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    return res.status(200).json(incrementVisitCount());
  } catch {
    return res.status(500).json({ error: "Unable to update visit count." });
  }
}
