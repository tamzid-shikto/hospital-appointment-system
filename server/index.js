// index.js
const express = require("express");
const path = require("path");
const { ConnectToDatabase } = require("./database");
const apiRoutes = require("./api");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/", express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.use("/api", apiRoutes);

async function startServer() {
  try {
    await ConnectToDatabase();
    console.log("Database connected.");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Initialization failed:", err.message);
    process.exit(1);
  }
}

startServer();