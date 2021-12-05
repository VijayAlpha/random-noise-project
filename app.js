// const Buffer = require("buffer");
const fs = require("fs");
const express = require("express");
const data = require("./data");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  //   let buff = new Buffer.from(data[1]);
  //   let base64data = buff.toString("base64");
  //   fs.writeFileSync("test.png", base64data);
  data.forEach((el, i) => {
    var matches = el.match(/^data:.+\/(.+);base64,(.*)$/);

    var ext = matches[1];
    var fileData = matches[2];
    var buffer = Buffer.from(fileData, "base64");

    fs.writeFileSync(`images/image-${i}.` + ext, buffer);
  });

  res.send("done");
});

app.post("/dataurl", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
