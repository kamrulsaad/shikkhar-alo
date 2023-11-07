"use client";

import TeacherApplyButton from "./TeacherApplyButton";
import { TeacherApplyInfo } from "@/interfaces/teacher";
import { Button } from "./ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

interface ButtonComponentProps {
  data: TeacherApplyInfo;
}

const ButtonComponent = ({ data }: ButtonComponentProps) => {
  const { userId } = useAuth();

  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    const getTeacher = async () => {
      const res = await fetch(`/api/teacher/${userId}`);
      const teacher = await res.json();

      if (teacher?.id) {
        if (teacher.approved) {
          setIsApproved(true);
          setIsPending(false);
        } else {
          setIsApproved(false);
          setIsPending(true);
        }
      }
    };

    getTeacher();
  }, [userId]);

  return isApproved ? (
    <Link href="/teacher/course">
      <Button size="sm" variant="ghost">
        Teacher mode
      </Button>
    </Link>
  ) : (
    <TeacherApplyButton disabled={isPending} data={data} />
  );
};

export default ButtonComponent;
