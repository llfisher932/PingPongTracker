import express from "express";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());
// Define your routes
app.post("/profile", (req, res, _next) => {
  console.log(req.body);
  res.json(req.body);
});
export default app;
