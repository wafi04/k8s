import { LOGO } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function LogoSidebar({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center w-full", className)}>
      <Image
        src={LOGO}
        width={50}
        height={50}
        alt="logo k8s"
        className="items-center"
      />
    </div>
  );
}
