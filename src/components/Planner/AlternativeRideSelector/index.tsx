import { JourneyRide } from "@/lib/types";
import React from "react";
import AlternativeRide from "./AlternativeRide";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Replace } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import usePlannerStore from "../plannerStore";
import { useTrackEvent } from "@/lib/analytics";

function AlternativeRideSelector({ ride }: { ride: JourneyRide }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const planner = usePlannerStore((state) => state.planner);

  useTrackEvent("planner_open_alternative_ride_selector", isOpen);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="w-full">
          <Replace size={16} />
          <div className="ml-2">Choose an alternative ride</div>
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[80vw]">
        <DialogHeader>
          <DialogTitle>Choose an alternative ride for this leg</DialogTitle>
        </DialogHeader>
        <div>
          <ScrollArea className="h-[500px]">
            <h4 className="dark:text-zinc-400 text-zinc-600 font-medium mb-3">
              Current ride
            </h4>
            <div className="max-w-lg mx-auto">
              <AlternativeRide entry={ride.details!} />
            </div>

            <h4 className="dark:text-zinc-400 text-zinc-600 font-medium my-3">
              Alternatives
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              {ride.alternatives?.map((alternative) => (
                <button
                  className="text-left cursor-pointer"
                  onClick={() => {
                    planner.chooseAlternativeRide(ride, alternative);
                    setIsOpen(false);
                  }}
                  key={alternative.id}
                >
                  <AlternativeRide entry={alternative} />
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AlternativeRideSelector;
