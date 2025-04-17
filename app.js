const express = require("express");
require("dotenv").config();
const app = express();

app.set(express.urlencoded({ extended: false }));

app.use("/", (req, res) => {
  res.send("<h1>Hello World</h1");
});

const HOST = process.env.HOST;

app.listen(HOST, () => console.log(`Server live at: http://localhost:${HOST}`));
