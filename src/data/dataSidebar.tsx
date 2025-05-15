import { Home, Phone, FolderKanban, Layers } from "lucide-react";
import { JSX } from "react";

export type SidebarItemType = {
  name: string;
  icon: JSX.Element;
  link: string;
  isActive?: boolean;
};

export const dataSidebar: SidebarItemType[] = [
  {
    name: "Home",
    icon: <Home size={20} />,
    link: "/home",
  },
  {
    name: "Sessions",
    icon: <Phone size={20} />,
    link: "/sessions",
  },
  {
    name: "Projects",
    icon: <FolderKanban size={20} />,
    link: "/projects",
  },
  {
    name: "Applications",
    icon: <Layers size={20} />,
    link: "/applications",
  },
];
