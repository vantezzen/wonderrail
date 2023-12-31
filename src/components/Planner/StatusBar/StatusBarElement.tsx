import React from "react";

function StatusBarElement({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs text-zinc-600">{title}</p>
      <p
        className="text-lg font-bold dark:text-zinc-300 text-zinc-800"
        suppressHydrationWarning
      >
        {children}
      </p>
    </div>
  );
}

export default StatusBarElement;
