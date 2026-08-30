import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

const prisma = new PrismaClient({
  adapter: new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  }),
});

async function getUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) return null;

  const payload = await verifyToken(token);

  if (!payload?.userId) return null;

  return Number(payload.userId);
}

export async function GET() {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "Please login first" },
        { status: 401 }
      );
    }

    const saved = await prisma.savedCollege.findMany({
      where: { userId },
      include: { college: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      saved.map((item) => item.college)
    );
  } catch (error) {
    console.error("GET SAVED ERROR:", error);

    return NextResponse.json(
      { error: "Unable to load saved colleges" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "Please login first" },
        { status: 401 }
      );
    }

    const { collegeId } = await request.json();

    const existing = await prisma.savedCollege.findUnique({
      where: {
        userId_collegeId: {
          userId,
          collegeId: Number(collegeId),
        },
      },
    });

    if (existing) {
      return NextResponse.json({
        message: "College already saved",
        saved: true,
      });
    }

    await prisma.savedCollege.create({
      data: {
        userId,
        collegeId: Number(collegeId),
      },
    });

    return NextResponse.json({
      message: "College saved successfully",
      saved: true,
    });
  } catch (error) {
    console.error("SAVE COLLEGE ERROR:", error);

    return NextResponse.json(
      { error: "Unable to save college" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "Please login first" },
        { status: 401 }
      );
    }

    const { collegeId } = await request.json();

    await prisma.savedCollege.delete({
      where: {
        userId_collegeId: {
          userId,
          collegeId: Number(collegeId),
        },
      },
    });

    return NextResponse.json({
      message: "College removed from saved colleges",
    });
  } catch (error) {
    console.error("DELETE SAVED ERROR:", error);

    return NextResponse.json(
      { error: "Unable to remove college" },
      { status: 500 }
    );
  }
}