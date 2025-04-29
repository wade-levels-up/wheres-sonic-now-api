const { executeWithPrisma } = require("../utils/executeWithPrisma");

const seedLevelData = async () => {
  try {
    console.log("Seeding database...");

    // Create levels in Level table
    await executeWithPrisma(async (prisma) => {
      await prisma.level.deleteMany();

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
                locationX: 2882,
                locationY: 514,
              },
            ],
          },
        },
      });

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
                locationX: 2478,
                locationY: 918,
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
