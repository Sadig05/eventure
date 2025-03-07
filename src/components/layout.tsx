import { useEffect, useState } from "react";
import { Outlet, useLocation } from "@tanstack/react-router";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
// import { AppBreadcrumb } from "@/components/app-breadcrumb";
import { Separator } from "@/components/ui/separator";
import { getSidebarState, saveSidebarState } from "@/utils/functions";
// import ProfileLoader from "./ProfileLoader";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(getSidebarState());
  const location = useLocation();

  // Update localStorage whenever the sidebar state changes
  useEffect(() => {
    saveSidebarState(isOpen);
  }, [isOpen]);

  // Check if current route is one that should NOT display the sidebar/header
  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/terms" ||
    location.pathname === "/404";

  if (hideLayout) {
    // For login/signup pages, render only the outlet without sidebar and header.
    return <Outlet>{children}</Outlet>;
  }

  return (
    <SidebarProvider open={isOpen} onOpenChange={setIsOpen}>
      {/* <ProfileLoader /> */}
      <AppSidebar />
      <SidebarInset className="min-h-screen flex flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear fixed z-10 bg-white w-full">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {/* <AppBreadcrumb /> */}
          </div>
        </header>
        <div className="flex-1 p-4 md:px-8 overflow-auto mt-16">
          <Outlet>{children}</Outlet>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
