import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { DataTable } from "./_components/dataTable";
import { columns } from "./_components/columns";

const TeachersPage = async () => {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const courses = await db.teacher.findMany({
    where: {},
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default TeachersPage;
