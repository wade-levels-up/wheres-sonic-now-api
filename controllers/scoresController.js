const asyncHandler = require("express-async-handler");
const { executeWithPrisma } = require("../utils/executeWithPrisma");
const { body, validationResult } = require("express-validator");

const validateUsername = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 12 })
    .withMessage("Name must be between 2 and 16 characters")
    .matches(/^\S+$/)
    .withMessage("Name cannot contain spaces"),
];

const getUserScore = asyncHandler(async (req, res) => {
  try {
    let session;

    await executeWithPrisma(async (prisma) => {
      session = await prisma.score.findUnique({
        where: {
          sid: req.sessionID,
        },
      });
    });

    res.status(200).json({ time: session.time });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllLevelScores = asyncHandler(async (req, res) => {
  try {
    let scores = [];

    await executeWithPrisma(async (prisma) => {
      scores = await prisma.score.findMany();
    });

    scores = scores.map((score) => {
      return { levelId: score.levelId, name: score.name, time: score.time };
    });

    res.status(200).json({ scores });
  } catch (error) {
    throw new Error(error);
  }
});

const saveUserScore = [
  validateUsername,
  asyncHandler(async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let errorMsgArr = [];
        let errorMsgString;
        errors.array().forEach((error) => {
          errorMsgArr.push(error.msg);
        });
        errorMsgString = errorMsgArr.join(", ");
        throw new Error(errorMsgString);
      }

      await executeWithPrisma(async (prisma) => {
        await prisma.score.update({
          data: {
            name: req.body.name,
          },
          where: {
            sid: req.sessionID,
          },
        });
      });

      await executeWithPrisma(async (prisma) => {
        await prisma.session.delete({
          where: {
            sid: req.sessionID,
          },
        });
      });

      res.status(200).json({ message: "Saved score" });
    } catch (error) {
      throw new Error(error);
    }
  }),
];

module.exports = { getUserScore, getAllLevelScores, saveUserScore };
