import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { JourneyRide } from "@/lib/types";
import { TextQuote } from "lucide-react";
import React from "react";
import JourneyRideLeg from "./JourneyRideLeg";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";

function JourneyRideDetailsModal({ ride }: { ride: JourneyRide }) {
  return (
    <Dialog>
      <DialogTrigger>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="secondary" size="sm">
              <TextQuote size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Ride details</TooltipContent>
        </Tooltip>
      </DialogTrigger>

      <DialogContent className="min-w-[70vw]">
        <ScrollArea className="max-h-[70vh]">
          <DialogHeader className="text-zinc-300">
            <DialogTitle>{ride.name}</DialogTitle>

            <DialogDescription></DialogDescription>
          </DialogHeader>

          {ride.details?.legs.map((leg) => (
            <div className="py-2">
              <hr className="pb-4" />
              <JourneyRideLeg leg={leg} />
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default JourneyRideDetailsModal;
