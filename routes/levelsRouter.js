const { Router } = require("express");
const levelsRouter = Router();
const levelsController = require("../controllers/levelsController");
const {
  createNewExpressSession,
  createExpressSession,
} = require("../middlewares/expressSession");

const saveSession = (req, res, next) => {
  req.session.save((err) => {
    if (err) {
      console.error("Error saving session:", err);
      return next(err);
    }
    next();
  });
};

levelsRouter.get(
  "/:levelName",
  createNewExpressSession(),
  saveSession,
  levelsController.setupSession
);
levelsRouter.post(
  "/",
  createExpressSession(),
  saveSession,
  levelsController.checkItemLocation
);

module.exports = levelsRouter;
