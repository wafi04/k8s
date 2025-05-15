import { ReactNode } from "react";
import { SidebarHome } from "./sidebar.";

export function Wrapper({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-row gap-7">
      <SidebarHome />
      <div className="p-8 w-full">{children}</div>
    </main>
  );
}
