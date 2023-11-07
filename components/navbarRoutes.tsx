"use client";

import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./searchInput";
import { isTeacher } from "@/lib/teacher";
import TeacherApplyButton from "./TeacherApplyButton";
import { TeacherApplyInfo } from "@/interfaces/teacher";

const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();
  const { user } = useUser();

  const data = {
    fullName: user?.fullName || "",
    email: user?.emailAddresses[0]?.emailAddress || ""
  };

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.startsWith("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isPlayerPage ? (
          <Link href={"/"}>
            <Button size={"sm"} variant={"ghost"}>
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/course">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        ) : (
          <TeacherApplyButton data={data as TeacherApplyInfo} />
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default NavbarRoutes;
