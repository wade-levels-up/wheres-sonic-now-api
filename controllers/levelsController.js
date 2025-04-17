const asyncHandler = require("express-async-handler");

const getLevelsData = asyncHandler(async (req, res) => {
  try {
    res.send("<h1>Testing</h1>");
  } catch (error) {
    throw new Error("error");
  }
});

module.exports = { getLevelsData };
