import React from "react";
import useContextSectionStore from "./contextState";
import ContextSectionStay from "../Stay/ContextSectionStay";

function ContextSection() {
  const context = useContextSectionStore((state) => state.context);

  if (!context) return null;

  return (
    <div>
      {context.type === "stay" && (
        <ContextSectionStay stayId={context.stayId} />
      )}
    </div>
  );
}

export default ContextSection;
