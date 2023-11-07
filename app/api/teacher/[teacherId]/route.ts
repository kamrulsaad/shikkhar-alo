import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { teacherId: string } }
) {
  try {
    const course = await db.teacher.findFirst({
      where: { userId: params.teacherId },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES] Error: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { teacherId: string } }
) {
  try {
    const { userId } = auth();
    const { teacherId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.teacher.update({
      where: { id: teacherId },
      data: {
        approved: true,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[TEACHER APPROVE] ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
