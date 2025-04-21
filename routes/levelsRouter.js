const { Router } = require("express");
const levelsRouter = Router();
const levelsController = require("../controllers/levelsController");
const session = require("../middlewares/expressSession");

levelsRouter.get(
  "/",
  session(),
  (req, res, next) => {
    req.session.save((err) => {
      if (err) {
        console.error("Error saving session:", err);
        return next(err);
      }
      next();
    });
  },
  levelsController.setupSession
);
levelsRouter.post("/", levelsController.checkItemLocation);

module.exports = levelsRouter;
