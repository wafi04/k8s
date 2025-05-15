import { cn } from "@/lib/utils";
import { Server } from "lucide-react";

export function HeaderPods({
  text,
  className,
  textClassName,
}: {
  text: string;
  className?: string;
  textClassName?: string;
}) {
  return (
    <section className={cn("border-b pb-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-blue-600">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h1
              className={cn(
                "font-semibold text-2xl text-gray-800",
                textClassName
              )}
            >
              {text}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
