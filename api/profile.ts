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

  const {
    blueNickname,
    redNickname,
    usernameInput,
    player1Score,
    player2Score,
  } = req.body;

  // Insert into Supabase
  const { error: insertError } = await supabase.from("matches").insert([
    {
      blue_nickname: blueNickname,
      red_nickname: redNickname,
      username: usernameInput,
      blue_score: player1Score,
      red_score: player2Score,
    },
  ]);

  if (insertError) return res.status(500).json({ error: insertError.message });

  const { data, error: selectError } = await supabase
    .from("matches")
    .select("*");
  if (selectError) {
    return res.status(500).json({ error: selectError.message });
  }
  res.status(200).json(data);
  console.log("Body received:", data);
}
