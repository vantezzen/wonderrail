import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
