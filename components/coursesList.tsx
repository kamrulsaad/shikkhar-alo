import { Category, Course } from "@prisma/client";
import { CourseCard } from "@/components/courseCard";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: {
    id: string;
  }[];
  progress: number | null;
};

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}

const CoursesList = ({ items }: CoursesListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            imageUrl={course.imageUrl!}
            chaptersLength={course.chapters.length} 
            progress={course.progress}
            price={course.price!}
            category={course?.category?.name!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-muted-foreground text-sm">
          No courses found
        </div>
      )}
    </div>
  );
};

export default CoursesList;
