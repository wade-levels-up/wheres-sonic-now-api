const { Router } = require("express");
const levelsRouter = Router();
const levelsController = require("../controllers/levelsController");

levelsRouter.post("/", levelsController.checkItemLocation);

module.exports = levelsRouter;
