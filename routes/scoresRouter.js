const { Router } = require("express");
const scoresRouter = Router();
const scoresController = require("../controllers/scoresController");
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

scoresRouter.get("/all", scoresController.getAllLevelScores);

scoresRouter.get(
  "/",
  createExpressSession(),
  saveSession,
  scoresController.getUserScore
);

scoresRouter.post(
  "/",
  createExpressSession(),
  saveSession,
  scoresController.saveUserScore
);

module.exports = scoresRouter;
