"use client";

import { AppSidebar } from "@/components/appsidebar";
import { LoadingPage } from "@/components/loading";
import { Navbar } from "@/components/navbar";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LayoutContent = ({ children, userType }: { children: React.ReactNode, userType: "manager" | "tenant" }) => {
  const { open } = useSidebar();

  return (
    <div className="min-h-screen w-full bg-primary-100">
      <Navbar />
      <div style={{ marginTop: `${NAVBAR_HEIGHT}px` }}>
        <main className="flex">
          <AppSidebar userType={userType} />
          {/* Content area */}
          <div
            className={`flex-grow transition-all duration-300 p-4 ${open ? "lg:ml-64" : "lg:ml-16"
              }`}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      const userRole = authUser.userRole?.toLowerCase();
      if (
        (userRole === "manager" && pathname.startsWith("/tenant")) ||
        (userRole === "tenant" && pathname.startsWith("/manager"))
      ) {
        router.push(
          userRole === "manager"
            ? "/managers/properties"
            : "/tenants/favorites",
          { scroll: false }
        );
      } else {
        setIsLoading(false);
      }
    }
  }, [authUser, router, pathname]);

  if (authLoading || isLoading) return <><LoadingPage /></>;
  if (!authUser?.userRole) return null;

  return (
    <SidebarProvider>
      <LayoutContent userType={authUser.userRole.toLowerCase()}>
        {children}
      </LayoutContent>
    </SidebarProvider>
  );
};

export default DashboardLayout;
