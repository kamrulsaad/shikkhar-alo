import { getChapter } from "@/actions/getChapters";
import Banner from "@/components/banner";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/videoPlayer";
import CourseEnrollButton from "./_components/courseEnrollButton";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { File } from "lucide-react";
import CourseProgressButton from "./_components/courseProgressButton";

const ChapterId = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const {
    chapter,
    course,
    muxData,
    nextChapter,
    userProgress,
    purchase,
    attachments,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner
          variant={"success"}
          label="You Already Completed This Chapter"
        />
      )}
      {isLocked && (
        <Banner
          variant={"warning"}
          label="You must purchase this course to view this chapter"
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapter={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div className="p-4 flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
          {purchase ? (
            <CourseProgressButton
              chapterId={params.chapterId}
              courseId={params.courseId}
              nextChapterId={nextChapter?.id}
              isCompleted={!!userProgress?.isCompleted}
            />
          ) : (
            <CourseEnrollButton
              courseId={params.courseId}
              price={course.price!}
            />
          )}
        </div>
        <Separator />
        <div>
          <Preview value={chapter.description!} />
        </div>
        {!!attachments.length && (
          <>
            <Separator />
            <div className="p-4">
              {attachments.map((attachment) => (
                <a
                  className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  href={attachment.url!}
                  target="_blank"
                  key={attachment.id}
                >
                  <File />
                  <p className="line-clamp-1 ">{attachment.name}</p>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChapterId;
