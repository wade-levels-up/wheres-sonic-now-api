const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const levelsRouter = require("./routes/levelsRouter");
const scoresRouter = require("./routes/scoresRouter");

const allowedOrigins = ["https://findsonicfast.netlify.app"];

const corsOptions = {
  origin: (origin, callback) => {
    console.log("Incoming request origin:", origin);
    console.log("Incoming request path:", this.req?.path);
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS @API"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

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
