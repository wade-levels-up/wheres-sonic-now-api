const { executeWithPrisma } = require("../utils/executeWithPrisma");

const seedLevelData = async () => {
  try {
    console.log("Seeding database...");

    // Create levels in Level table
    await executeWithPrisma(async (prisma) => {
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
                locationX: 78,
                locationY: 558,
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
