const { Router } = require("express");
const levelsRouter = Router();
const levelsController = require("../controllers/levelsController");
const session = require("../middlewares/expressSession");

levelsRouter.get("/", session(), levelsController.setCookie);
levelsRouter.post("/", levelsController.checkItemLocation);

module.exports = levelsRouter;
