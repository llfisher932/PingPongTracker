// Use "type: module" in package.json to use ES modules
import express from "express";
const app = express();

app.use(express.json());
// Define your routes
app.post("/profile", (req, res, _next) => {
  console.log(req.body);
  res.json(req.body);
});

// Export the Express app
export default app;
