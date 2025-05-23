const asyncHandler = require("express-async-handler");
const { executeWithPrisma } = require("../utils/executeWithPrisma");

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

    res.status(200).json({ status: "success", token: req.jwt });
  } catch (error) {
    throw new Error(error);
  }
});

const checkItemLocation = asyncHandler(async (req, res) => {
  try {
    await executeWithPrisma(async (prisma) => {
      const item = await prisma.item.findMany({
        where: {
          levelId: req.body.levelId,
          name: req.body.name,
        },
      });

      let isFound = false;

      const x = Number(req.body.x);
      const y = Number(req.body.y);

      if (
        x > item[0].locationX - 50 &&
        x < item[0].locationX + 50 &&
        y > item[0].locationY - 50 &&
        y < item[0].locationY + 50
      ) {
        isFound = true;
      }

      // If an item is found update the session
      if (isFound) {
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

        // Save the finished time to the session
        await prisma.$executeRaw`
        UPDATE "Session"
        SET "finished_at" = NOW()
        WHERE "sid" = ${req.sessionID};
      `;

        const finishedSession = await prisma.session.findUnique({
          where: {
            sid: req.sessionID,
          },
        });

        const differenceInSeconds = (
          (finishedSession.finished_at - finishedSession.created_at) /
          1000
        ).toFixed(2);

        await prisma.score.create({
          data: {
            time: differenceInSeconds,
            levelId: finishedSession.level,
            sid: finishedSession.sid,
          },
        });

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
