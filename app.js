const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: process.env.CLIENT,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", (req, res) => {
  res.send("<h1>Hello World</h1");
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.statusCode || 500).json({ message: error.message });
});

const HOST = process.env.HOST;
app.listen(HOST, () => console.log(`Server live at: http://localhost:${HOST}`));
