const asyncHandler = require("express-async-handler");
const { executeWithPrisma } = require("../utils/executeWithPrisma");
const prisma = require("../utils/prismaClient");

const setupSession = asyncHandler(async (req, res) => {
  try {
    // Update session level name
    await executeWithPrisma(async (prisma) => {
      await prisma.session.update({
        data: {
          level: req.params.levelName,
        },
        where: {
          sid: req.sessionID,
        },
      });
    });

    res.status(200).json({ status: "success" });
  } catch (error) {
    throw new Error(error);
  }
});

const checkItemLocation = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    await executeWithPrisma(async (prisma) => {
      const item = await prisma.item.findMany({
        where: {
          levelId: req.body.level,
          name: req.body.name,
        },
      });

      let isFound = false;

      const x = Number(req.body.x);
      const y = Number(req.body.y);

      if (
        x > item[0].locationX - 25 &&
        x < item[0].locationX + 25 &&
        y > item[0].locationY - 25 &&
        y < item[0].locationY + 25
      ) {
        isFound = true;
      }
      console.log(isFound);
      console.log(req.sessionID);

      // If an item is found update the session
      if (isFound && req.session) {
        await prisma.session.update({
          data: {
            [req.body.name.toLowerCase() + "Found"]: true,
          },
          where: {
            sid: req.sessionID,
          },
        });
      }

      // Check if all items are found
      const gameSession = await prisma.session.findUnique({
        where: {
          sid: req.sessionID,
        },
      });

      const { sonicFound, tailsFound, knucklesFound } = gameSession;
      if (sonicFound && tailsFound && knucklesFound) {
        const allFound = true;
        res.json({ isFound, allFound });
      } else {
        res.json({ isFound });
      }
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { checkItemLocation, setupSession };
