import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronRight,
  Ticket,
} from "lucide-react";
import React from "react";
import useContextSectionStore from "../ContextSection/contextState";
import { cn } from "@/lib/utils";

function PassEditorOpener() {
  const setContext = useContextSectionStore((state) => state.setContext);
  const context = useContextSectionStore((state) => state.context);

  const isSelected = context && context.type === "passEditor";

  return (
    <button
      id="planner-pass-editor"
      className="w-full mt-3"
      onClick={() => {
        setContext({
          type: "passEditor",
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
              <Ticket size={20} className="mr-3" />
              My Interrail Pass
            </div>
            <ChevronRight size={16} />
          </CardTitle>
        </CardHeader>
      </Card>
    </button>
  );
}

export default PassEditorOpener;
