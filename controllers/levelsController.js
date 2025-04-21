const asyncHandler = require("express-async-handler");
const { executeWithPrisma } = require("../utils/executeWithPrisma");

const setCookie = asyncHandler(async (req, res) => {
  try {
    console.log("Setting cookie");
    console.log(req.session);
    res.status(200).json({ status: "success" });
  } catch (error) {
    throw new Error(error);
  }
});

const checkItemLocation = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
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
      console.log(isFound);
      res.json({ isFound });
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { checkItemLocation, setCookie };
