"use client";

import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import { Loader2, LockIcon } from "lucide-react";
import { useState } from "react";

interface VideoPlayerProps {
  chapterId: string;
  title: string;
  courseId: string;
  nextChapter?: string;
  playbackId: string;
  isLocked: boolean;
  completeOnEnd: boolean;
}

const VideoPlayer = ({
  chapterId,
  title,
  courseId,
  nextChapter,
  playbackId,
  isLocked,
  completeOnEnd,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="w-8 h-8 text-secondary animate-spin" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <LockIcon className="w-8 h-8" />
          <p className="text-sm">This Chapter is Locked.</p>
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          onCanPlay={() => setIsReady(true)}
          className={cn(!isReady && "hidden")}
          title={title}
          onEnded={() => {}}
          autoPlay
          playbackId={playbackId}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
