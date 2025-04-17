const { Router } = require("express");
const levelsRouter = Router();
const levelsController = require("../controllers/levelsController");

levelsRouter.get("/", levelsController.getLevelsData);

module.exports = levelsRouter;
