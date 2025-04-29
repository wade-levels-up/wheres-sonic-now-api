const asyncHandler = require("express-async-handler");
const { executeWithPrisma } = require("../utils/executeWithPrisma");

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

const saveUserScore = asyncHandler(async (req, res) => {
  try {
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

    req.session.destroy();

    res.status(200).json({ message: "Saved score" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { getUserScore, getAllLevelScores, saveUserScore };
