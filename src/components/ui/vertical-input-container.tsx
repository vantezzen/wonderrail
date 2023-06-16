import React from "react";

function VerticalInputContainer({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

export default VerticalInputContainer;
