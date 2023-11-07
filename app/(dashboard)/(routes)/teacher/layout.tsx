import getTeacher from "@/actions/getTeacher";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const TeacherLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  // const approvedTeacher = (await getTeacher()).approved;

  if (!(await getTeacher(userId as string)).approved) {
    return redirect("/");
  }

  return <>{children}</>;
};

export default TeacherLayout;
