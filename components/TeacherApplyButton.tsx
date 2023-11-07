import { Button } from "./ui/button";
import { TeacherApplyInfo } from "@/interfaces/teacher";
import axios from "axios";
import toast from "react-hot-toast";

interface TeacherApplyButtonProps {
  data: TeacherApplyInfo;
}

const TeacherApplyButton = ({ data }: TeacherApplyButtonProps) => {
  const handleApply = () => {
    toast.promise(axios.post("/api/teacher", data), {
      loading: "Application in progress...",
      success: "Your Application is pending approval",
      error: "Something went wrong",
    });
  };

  return (
    <Button onClick={handleApply} size="sm" variant="ghost">
      Become a Teacher
    </Button>
  );
};

export default TeacherApplyButton;
