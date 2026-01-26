import express from "express";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "SmartFaktura backend is alive" });
});

app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
});
