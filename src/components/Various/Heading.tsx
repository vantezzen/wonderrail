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
    <h1
      className={cn(
        "text-xl font-bold dark:text-white text-zinc-900",
        className
      )}
    >
      {children}
    </h1>
  );
}

export default Heading;
