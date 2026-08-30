import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient({
  adapter: new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  }),
});

export async function GET() {
  try {
    const colleges = await prisma.college.findMany({
      orderBy: {
        rating: "desc",
      },
    });

    return NextResponse.json(colleges);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch colleges" },
      { status: 500 }
    );
  }
}