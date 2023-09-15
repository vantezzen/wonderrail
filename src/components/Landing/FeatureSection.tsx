import { cn } from "@/lib/utils";
import React from "react";

function FeatureSection({
  title,
  subtitle,
  children,
  className,
}: {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-h-1 pt-32 max-w-6xl mx-auto p-12", className)}>
      <h2 className="text-6xl font-extrabold max-w-2xl">{title}</h2>

      <p className="text-xl mt-8 text-zinc-600">{subtitle}</p>

      {children}
    </div>
  );
}

export default FeatureSection;
