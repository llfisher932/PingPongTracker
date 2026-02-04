import type { VercelRequest, VercelResponse } from "@vercel/node";
import supabase from "../src/supabase";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Parse JSON body (Vercel parses it automatically if sent as JSON)
  let games = await supabase.from("matches").select();
  const data = games;

  console.log("Body received:", data);

  // Echo the data back
  res.status(200).json(data);
}
