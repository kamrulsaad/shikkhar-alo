"use client";

import { ConfirmModal } from "@/components/modal/confirmModal";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/useConfettiStore";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

export const Actions = ({ disabled, courseId, isPublished }: ActionsProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Course Unpublished.");
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("Course Published successfully.");
        confetti.onOpen();
      }

      router.refresh();
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/courses/${courseId}`);

      toast.success("Course deleted successfully.");
      router.refresh();
      router.push(`/teacher/course`);
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        disabled={disabled || loading}
        variant={"outline"}
        size={"sm"}
        onClick={onClick}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button variant={"destructive"} disabled={loading} size={"sm"}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
