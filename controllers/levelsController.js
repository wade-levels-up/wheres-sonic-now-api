const asyncHandler = require("express-async-handler");
const { executeWithPrisma } = require("../utils/executeWithPrisma");

const checkItemLocation = asyncHandler(async (req, res) => {
  try {
    return await executeWithPrisma(async (prisma) => {
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

      res.json({ isFound });
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { checkItemLocation };
