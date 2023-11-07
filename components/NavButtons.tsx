"use client";

import TeacherApplyButton from "./TeacherApplyButton";
import { TeacherApplyInfo } from "@/interfaces/teacher";
import getTeacher from "@/actions/getTeacher";
import { Button } from "./ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

interface ButtonComponentProps {
  data: TeacherApplyInfo;
}

const ButtonComponent = ({ data }: ButtonComponentProps) => {
  const { userId } = useAuth();

  const [isTeacherApproved, setIsTeacherApproved] = useState(false);
  const [isTeacherPending, setIsTeacherPending] = useState(false);

  useEffect(() => {
    const getTeacherData = async () => {
      const teacher = await getTeacher(userId as string);
      setIsTeacherApproved(teacher.approved);
      setIsTeacherPending(teacher.pending);
    };
    getTeacherData();
  }, [isTeacherApproved, userId]);

  return isTeacherApproved ? (
    <Link href="/teacher/course">
      <Button size="sm" variant="ghost">
        Teacher mode
      </Button>
    </Link>
  ) : (
    <TeacherApplyButton disabled={isTeacherPending} data={data} />
  );
};

export default ButtonComponent;
