import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import axios from "axios";

interface TeacherStatus {
  approved: boolean;
  pending: boolean;
}

const getTeacher = async (userId : string): Promise<TeacherStatus> => {
  try {

    if (!userId) {
      return {
        approved: false,
        pending: false,
      };
    }

    const teacher = await db.teacher.findFirst({
      where: { userId },
    });

    if (!teacher) {
      return {
        approved: false,
        pending: false,
      };
    } else {
      if (teacher.approved) {
        return { approved: true, pending: false };
      } else {
        return {
          approved: false,
          pending: true,
        };
      }
    }
  } catch (error: any) {
    console.log("[TEACHER] Error: ", error.message);
    return {
      approved: false,
      pending: false,
    };
  }
};

export default getTeacher;
