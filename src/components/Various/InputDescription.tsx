import React from "react";

function InputDescription({ children }: { children: React.ReactNode }) {
  return <p className="font-medium text-xs text-zinc-500">{children}</p>;
}

export default InputDescription;
