// server.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Import and start the memory hog logic
require("./index");

app.get("/", (_, res) => {
  res.send("Memory Hog Server is running and consuming memory...");
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
