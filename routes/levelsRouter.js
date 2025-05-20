const { Router } = require("express");
const levelsRouter = Router();
const levelsController = require("../controllers/levelsController");
const createExpressSession = require("../middlewares/expressSession");
const decodeAndAttachJWTSessionId = require("../middlewares/decodeAndAttachJWTSessionId");

const saveSession = (req, res, next) => {
  if (!req.session) {
    console.log(
      "No session found on the request object, passing to next middleware"
    );
    return next();
  }

  req.session.save((err) => {
    console.log("Session found on req object. Saving session...");
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
  decodeAndAttachJWTSessionId,
  levelsController.checkItemLocation
);

module.exports = levelsRouter;
