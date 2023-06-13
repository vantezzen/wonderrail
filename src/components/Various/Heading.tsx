import { cn } from "@/lib/utils";
import React from "react";

function Heading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1 className={cn("text-3xl font-bold text-white", className)}>
      {children}
    </h1>
  );
}

export default Heading;
