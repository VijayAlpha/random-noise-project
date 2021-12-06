const express = require("express");
const convertToPNG = require("./convert-data-to-png");
const app = express();
const port = 3000;

app.use(express.static("./"));
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.sendFile("/index.html");
});

app.post("/dataurl", (req, res) => {
  convertToPNG(req.body.pngData);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
