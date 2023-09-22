"use client";

import { Layout, Compass } from "lucide-react";
import SideBarItem from "./sideBarItem";

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

const SidebarRoutes = () => {
  const routes = guestRoutes;
  return (
    <div className="flex flex-col w-full">
        {routes.map((route) => (
            <SideBarItem key={route.href} {...route} />
        ))}
    </div>
  );
};

export default SidebarRoutes;
