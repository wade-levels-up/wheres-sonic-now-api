const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const levelsRouter = require("./routes/levelsRouter");
const scoresRouter = require("./routes/scoresRouter");

app.use(
  cors({
    origin: "https://find-sonic-fast-backend-production.up.railway.app/",
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

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server live at: http://localhost:${PORT}`));
