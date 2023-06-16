import React from "react";
import { Badge } from "../../badge/badge";
import { cn } from "@/lib/utils";

function JourneyRideBadge({
  icon,
  children,
  className,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "text-xs font-normal flex items-center gap-2 px-2 py-1",
        className
      )}
    >
      {icon}
      {children}
    </Badge>
  );
}

export default JourneyRideBadge;
