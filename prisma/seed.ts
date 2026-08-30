import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../app/generated/prisma";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });
async function main() {
  await prisma.college.createMany({
    data: [
      {
        name: "IIT Hyderabad",
        location: "Hyderabad",
        fees: 200000,
        rating: 4.6,
        overview:
          "IIT Hyderabad is a premier engineering institute focused on research, innovation and quality education.",
        averagePackage: 2000000,
        highestPackage: 6500000,
        courses: [
          "Computer Science",
          "Electrical Engineering",
          "Mechanical Engineering",
        ],
      },

      {
        name: "NIT Warangal",
        location: "Warangal",
        fees: 150000,
        rating: 4.5,
        overview:
          "NIT Warangal is one of India's leading engineering institutions.",
        averagePackage: 1500000,
        highestPackage: 5000000,
        courses: [
          "Computer Science",
          "Electronics",
          "Civil Engineering",
        ],
      },

      {
        name: "IIIT Hyderabad",
        location: "Hyderabad",
        fees: 250000,
        rating: 4.4,
        overview:
          "IIIT Hyderabad is known for computer science education and research.",
        averagePackage: 1800000,
        highestPackage: 5500000,
        courses: [
          "Computer Science",
          "Electronics",
          "Artificial Intelligence",
        ],
      },

      {
        name: "BITS Hyderabad",
        location: "Hyderabad",
        fees: 450000,
        rating: 4.7,
        overview:
          "BITS Hyderabad offers multidisciplinary programs with strong academic and industry exposure.",
        averagePackage: 1800000,
        highestPackage: 6000000,
        courses: [
          "Computer Science",
          "Electronics",
          "Mechanical Engineering",
        ],
      },

      {
        name: "VNR VJIET",
        location: "Hyderabad",
        fees: 120000,
        rating: 4.2,
        overview:
          "VNR VJIET is an engineering college offering undergraduate and postgraduate programs.",
        averagePackage: 700000,
        highestPackage: 2500000,
        courses: [
          "Computer Science",
          "Information Technology",
          "Electronics",
        ],
      },

      {
        name: "CBIT",
        location: "Hyderabad",
        fees: 140000,
        rating: 4.1,
        overview:
          "CBIT is a well-established engineering institution with academic and industry programs.",
        averagePackage: 750000,
        highestPackage: 3000000,
        courses: [
          "Computer Science",
          "Information Technology",
          "Mechanical Engineering",
        ],
      },
    ],
  });

  console.log("College data inserted successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });