import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

function WithTooltip({
  children,
  text,
}: {
  children: React.ReactNode;
  text: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>{text}</TooltipContent>
    </Tooltip>
  );
}

export default WithTooltip;
