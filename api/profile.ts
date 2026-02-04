import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Parse JSON body (Vercel parses it automatically if sent as JSON)
  const data = req.body;

  console.log("Body received:", data);

  // Echo the data back
  res.status(200).json(data);
}
