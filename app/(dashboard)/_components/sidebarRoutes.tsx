"use client";

import { Layout, Compass, List, BarChart, User, UserPlus2 } from "lucide-react";
import SideBarItem from "./sideBarItem";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { isAdmin } from "@/lib/admin";
import { useEffect } from "react";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/course",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

const adminRoute = {
  icon: UserPlus2,
  label: "Teachers",
  href: "/admin/teachers",
};

const SidebarRoutes = () => {
  const pathname = usePathname();

  const { userId } = useAuth();

  useEffect(() => {
    isAdmin(userId) && teacherRoutes.push(adminRoute);
  }, [userId]);

  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SideBarItem key={route.href} {...route} />
      ))}
    </div>
  );
};

export default SidebarRoutes;
