"use client";

import { Category } from "@prisma/client";
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";

import { IconType } from "react-icons";
import CategoryItem from "./categoryItem";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<string, IconType> = {
  Music: FcMusic,
  Photography: FcOldTimeCamera,
  Fitness: FcSportsMode,
  Accounting: FcSalesPerformance,
  "Computer Science": FcMultipleDevices,
  Filming: FcFilmReel,
  Engineering: FcEngineering,
} as const;

const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((category) => (
        <CategoryItem
          key={category.id}
          label={category.name as string}
          icon={iconMap[category.name!]}
          value={category.id}
        />
      ))}
    </div>
  );
};

export default Categories;
