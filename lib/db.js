import { PrismaClient } from "@prisma/client";

let prisma;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} 
else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

//GOOD PRACTICE : use cached information to reduce the number of query to the database
//reduce the number of prisma Client to 1 if nextjs keep reloading to re-render the app
export const db = prisma;