import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Cog, ChevronRight } from "lucide-react";
import React from "react";
import useContextSectionStore from "../ContextSection/contextState";
import { cn } from "@/lib/utils";

function GeneralSettingsOpener() {
  const setContext = useContextSectionStore((state) => state.setContext);
  const context = useContextSectionStore((state) => state.context);

  const isSelected = context && context.type === "generalSettings";

  return (
    <button
      id="planner-general-settings"
      className="w-full"
      onClick={() => {
        setContext({
          type: "generalSettings",
        });
      }}
    >
      <Card
        className={cn(
          isSelected
            ? "border-2 border-zinc-700"
            : "border-2 border-transparent"
        )}
      >
        <CardHeader className="w-full">
          <CardTitle className="flex items-center justify-between text-lg">
            <div className="flex items-center">
              <Cog size={20} className="mr-3" />
              General settings
            </div>
            <ChevronRight size={16} />
          </CardTitle>
        </CardHeader>
      </Card>
    </button>
  );
}

export default GeneralSettingsOpener;