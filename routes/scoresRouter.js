const { Router } = require("express");
const scoresRouter = Router();
const scoresController = require("../controllers/scoresController");
const createExpressSession = require("../middlewares/expressSession");
const decodeAndAttachJWTSessionId = require("../middlewares/decodeAndAttachJWTSessionId");

const saveSession = (req, res, next) => {
  if (!req.session) {
    return next();
  }

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
  decodeAndAttachJWTSessionId,
  scoresController.getUserScore
);

scoresRouter.post(
  "/",
  createExpressSession(),
  saveSession,
  decodeAndAttachJWTSessionId,
  scoresController.saveUserScore
);

module.exports = scoresRouter;
