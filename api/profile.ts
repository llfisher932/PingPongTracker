import express from "express";
import cors from "cors";

const app = express();

// Enable CORS
app.use(cors({ origin: "*" }));

// Parse JSON body
app.use(express.json());

// POST to the **root** of this API file
app.post("/", (req, res) => {
  console.log("Body received:", req.body);
  res.json(req.body); // echoes the request
});

export default app;
