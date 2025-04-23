const { Router } = require("express");
const levelsRouter = Router();
const levelsController = require("../controllers/levelsController");
const createExpressSession = require("../middlewares/expressSession");

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
  createExpressSession({ regenerate: true }),
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
