import { Button } from "./ui/button";
import { TeacherApplyInfo } from "@/interfaces/teacher";
import axios from "axios";
import toast from "react-hot-toast";

interface TeacherApplyButtonProps {
  data: TeacherApplyInfo;
  disabled?: boolean;
}

const TeacherApplyButton = ({ data, disabled }: TeacherApplyButtonProps) => {
  const handleApply = () => {
    toast.promise(axios.post("/api/teacher", data), {
      loading: "Application going on",
      success: "Your Application is pending approval",
      error: "Something went wrong",
    });
  };

  return (
    <Button disabled={disabled} onClick={handleApply} size="sm" variant="ghost">
      Become a Teacher
    </Button>
  );
};

export default TeacherApplyButton;
