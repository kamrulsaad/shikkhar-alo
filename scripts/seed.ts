const PrismaClient = require("@prisma/client").PrismaClient;

const database = new PrismaClient();

async function main() {
  try {
    await database.Chapter.createMany({
      data:[]        
    });

    console.log("Success seeding database");

    // const categories = await database.Course.findMany({
    //   select: {
    //     title: true,
    //     id: true,
    //   },
    // });

    // console.log(categories);
  } catch (error) {
    console.log("Error seeding database categories: ", error);
  } finally {
    await database.$disconnect();
  }
}

main();
