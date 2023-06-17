import { cn } from "@/lib/utils";
import React from "react";

function Dot({ className }: { className?: string }) {
  return <div className={cn("h-3 w-3 rounded-full bg-zinc-400", className)} />;
}

export default Dot;
