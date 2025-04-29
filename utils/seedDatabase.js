const { executeWithPrisma } = require("../utils/executeWithPrisma");

const seedLevelData = async () => {
  try {
    console.log("Seeding database...");

    // Create levels in Level table
    await executeWithPrisma(async (prisma) => {
      await prisma.score.deleteMany();
      await prisma.level.deleteMany();

      await prisma.level.create({
        data: {
          id: "angel-island-zone",
          items: {
            create: [
              {
                name: "sonic",
                locationX: 188,
                locationY: 1508,
              },
              {
                name: "tails",
                locationX: 1798,
                locationY: 1224,
              },
              {
                name: "knuckles",
                locationX: 2892,
                locationY: 514,
              },
            ],
          },
        },
      });

      await prisma.level.create({
        data: {
          id: "hydro-city-zone",
          items: {
            create: [
              {
                name: "sonic",
                locationX: 570,
                locationY: 1326,
              },
              {
                name: "tails",
                locationX: 1738,
                locationY: 1579,
              },
              {
                name: "knuckles",
                locationX: 214,
                locationY: 164,
              },
            ],
          },
        },
      });

      await prisma.level.create({
        data: {
          id: "marble-garden-zone",
          items: {
            create: [
              {
                name: "sonic",
                locationX: 472,
                locationY: 1606,
              },
              {
                name: "tails",
                locationX: 1714,
                locationY: 1570,
              },
              {
                name: "knuckles",
                locationX: 1002,
                locationY: 792,
              },
            ],
          },
        },
      });

      await prisma.level.create({
        data: {
          id: "carnival-night-zone",
          items: {
            create: [
              {
                name: "sonic",
                locationX: 2092,
                locationY: 376,
              },
              {
                name: "tails",
                locationX: 558,
                locationY: 172,
              },
              {
                name: "knuckles",
                locationX: 1962,
                locationY: 1288,
              },
            ],
          },
        },
      });

      await prisma.level.create({
        data: {
          id: "ice-cap-zone",
          items: {
            create: [
              {
                name: "sonic",
                locationX: 2484,
                locationY: 922,
              },
              {
                name: "tails",
                locationX: 962,
                locationY: 1406,
              },
              {
                name: "knuckles",
                locationX: 82,
                locationY: 556,
              },
            ],
          },
        },
      });

      await prisma.level.create({
        data: {
          id: "launch-base-zone",
          items: {
            create: [
              {
                name: "sonic",
                locationX: 1082,
                locationY: 404,
              },
              {
                name: "tails",
                locationX: 2542,
                locationY: 1674,
              },
              {
                name: "knuckles",
                locationX: 964,
                locationY: 1832,
              },
            ],
          },
        },
      });
    });

    console.log("Seeding complete!");
  } catch (error) {
    console.log(error);
  }
};

seedLevelData();
