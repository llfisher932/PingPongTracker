import type { VercelRequest, VercelResponse } from "@vercel/node";
import supabase from "./supabase.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all origins (dev/test)
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { usernameInput } = req.body;

  const { data, error: selectError } = await supabase
    .from("matches")
    .select("username, blue_nickname, red_nickname, blue_score, red_score")
    .eq("username", `${usernameInput}`)
    .order("created_at", { ascending: false });
  if (selectError) {
    return res.status(500).json({ error: selectError.message });
  }
  res.status(200).json(data);
  console.log("Body received:", data);
}
