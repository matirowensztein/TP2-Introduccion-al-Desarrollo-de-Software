const express = require('express');
const app = express();

app.get("/", (req, res) => {
  res.send("Hi!");
});

app.listen(1234, () => {
  console.log("Server is running on port 1234");
});