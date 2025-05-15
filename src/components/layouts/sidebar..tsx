"use client";
import React from "react";
import { LogoSidebar } from "../ui/logo/logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SidebarItemType, dataSidebar } from "@/data/dataSidebar";
import { usePathname } from "next/navigation";

export function SidebarHome() {
  return (
    <aside className="h-screen flex flex-col w-64 border-r border-gray-200 shadow-sm">
      {/*  section  Logo */}
      <LogoSidebar className="border-b-4 border p-5 items-center w-full" />

      <div className="flex-1 overflow-y-auto py-6 px-3">
        <nav className="space-y-1">
          {dataSidebar.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </nav>
      </div>

      {/* section user profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
            U
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">username</p>
            <p className="text-xs text-gray-500">wafiq610@gmail.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({
  item,
  secondary = false,
}: {
  item: SidebarItemType;
  secondary?: boolean;
}) {
  const locationNow = usePathname();
  const isActive = item.link === locationNow;
  return (
    <Link
      href={item.link}
      className={cn(
        "flex items-center px-3 py-2 text-sm rounded-md group transition-colors",
        item.isActive
          ? "bg-blue-50 text-blue-600"
          : "text-gray-700 hover:bg-gray-100",
        secondary && "text-gray-600"
      )}
    >
      <span
        className={cn(
          "mr-3",
          isActive ? "text-blue-500" : "text-gray-500 group-hover:text-gray-600"
        )}
      >
        {item.icon}
      </span>
      <span className="font-medium">{item.name}</span>
      {isActive && (
        <span className="ml-auto h-2 w-2 rounded-full bg-blue-500"></span>
      )}
    </Link>
  );
}
