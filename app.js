const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const levelsRouter = require("./routes/levelsRouter");
const scoresRouter = require("./routes/scoresRouter");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/levels", levelsRouter);
app.use("/scores", scoresRouter);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.statusCode || 500).json({ message: error.message });
});

const HOST = process.env.HOST;
app.listen(HOST, () => console.log(`Server live at: http://localhost:${HOST}`));
