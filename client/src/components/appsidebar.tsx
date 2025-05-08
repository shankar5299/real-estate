"use client";

import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import {
  Building,
  FileText,
  Heart,
  Home,
  Menu,
  Settings,
  X,
} from "lucide-react";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const AppSidebar = ({ userType }: AppSidebarProps) => {
  const pathname = usePathname();
  const { toggleSidebar, open } = useSidebar();

  const navLinks =
    userType === "manager"
      ? [
          { icon: Building, label: "Properties", href: "/managers/properties" },
          { icon: FileText, label: "Applications", href: "/managers/applications" },
          { icon: Settings, label: "Settings", href: "/managers/settings" },
        ]
      : [
          { icon: Heart, label: "Favorites", href: "/tenants/favorites" },
          { icon: FileText, label: "Applications", href: "/tenants/applications" },
          { icon: Home, label: "Residences", href: "/tenants/residences" },
          { icon: Settings, label: "Settings", href: "/tenants/settings" },
        ];

  return (
    <Sidebar
      collapsible="icon"
      className={cn(
        "fixed left-0 bg-white shadow-lg transition-all duration-300 ease-in-out",
        open ? "w-64" : "w-16"
      )}
      style={{
        top: `${NAVBAR_HEIGHT}px`,
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
      }}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={cn(
                "flex min-h-[56px] w-full items-center pt-3 mb-3",
                open ? "justify-between px-6" : "justify-center"
              )}
            >
              {open ? (
                <>
                  <h1 className="text-xl font-bold text-gray-800">
                    {userType === "manager" ? "Manager View" : "Renter View"}
                  </h1>
                  <button
                    aria-label="Toggle sidebar"
                    onClick={() => toggleSidebar()}
                    className="hover:bg-gray-100 p-2 rounded-md"
                  >
                    <X className="size-6 text-gray-600" />
                  </button>
                </>
              ) : (
                <button
                  aria-label="Toggle sidebar"
                  onClick={() => toggleSidebar()}
                  className="hover:bg-gray-100 p-2 rounded-md"
                >
                  <Menu className="size-6 text-gray-600" />
                </button>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <SidebarMenuItem key={`${userType}-${link.href}`}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "flex items-center transition-all duration-300",
                    isActive
                      ? "bg-gray-100  border-blue-600"
                      : "text-gray-600 hover:bg-gray-100",
                    open ? "px-7 py-7" : "p-7 justify-center"
                  )}
                >
                  <Link href={link.href} className="w-full" scroll={false}>
                    <div className="flex items-center gap-3">
                      <link.icon
                        className={cn(
                          "size-5",
                          isActive ? "text-blue-600" : "text-gray-600"
                        )}
                      />
                      {open && (
                        <span
                          className={cn(
                            "font-medium",
                            isActive ? "text-blue-600" : "text-gray-600"
                          )}
                        >
                          {link.label}
                        </span>
                      )}
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};
