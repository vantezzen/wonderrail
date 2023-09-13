import React from "react";
import useContextSectionStore from "../ContextSection/contextState";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

function BackToItiniaryButton() {
  const setContext = useContextSectionStore((state) => state.setContext);

  return (
    <Button
      variant="brand"
      size="sm"
      onClick={() =>
        setContext({
          type: "itinerary",
        })
      }
    >
      <ChevronLeft size={16} />
      <span className="ml-2">Back to itinerary</span>
    </Button>
  );
}

export default BackToItiniaryButton;
