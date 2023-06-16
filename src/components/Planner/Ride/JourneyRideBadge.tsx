import React from "react";
import { Badge } from "../../badge/badge";

function JourneyRideBadge({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Badge
      variant="secondary"
      className="text-xs font-normal flex items-center gap-2 px-2 py-1"
    >
      {icon}
      {children}
    </Badge>
  );
}

export default JourneyRideBadge;
