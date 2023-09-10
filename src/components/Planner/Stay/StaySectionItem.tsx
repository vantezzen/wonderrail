import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React from "react";

function StaySectionItem({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="">
      <Separator className="my-3" />

      <div className="flex items-center justify-between pt-3">
        <h3 className="dark:text-zinc-200 text-zinc-600 font-bold">{title}</h3>
        <div className={cn("flex items-center gap-3", className)}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default StaySectionItem;
