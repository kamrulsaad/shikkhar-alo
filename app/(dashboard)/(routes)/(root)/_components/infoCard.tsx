import { IconBadge } from "@/components/iconBadge";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  variant?: "default" | "success";
  icon: LucideIcon;
  label: string;
  numberOfItems: number;
}

const InfoCard = ({
  variant,
  icon: Icon,
  label,
  numberOfItems,
}: InfoCardProps) => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <IconBadge variant={variant} icon={Icon} />
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-gray-500 text-sm">
          {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
