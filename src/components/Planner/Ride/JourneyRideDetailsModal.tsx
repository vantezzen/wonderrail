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
import { ExternalLink, Info } from "lucide-react";
import React from "react";
import JourneyRideLeg from "./JourneyRideLeg";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import usePlannerStore from "../plannerStore";

function JourneyRideDetailsModal({
  ride,
  open,
  setIsOpen,
}: {
  ride: JourneyRide;
  open: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const planner = usePlannerStore((state) => state.planner);

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="secondary" size="sm">
              <Info size={16} />
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
            <div className="py-2" key={leg.id}>
              <hr className="pb-4" />
              <JourneyRideLeg leg={leg} />
            </div>
          ))}
        </ScrollArea>

        <Button className="mt-4 flex items-center gap-2" asChild>
          <a
            href={planner.interrail.getBookingUrl(ride)}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink size={16} />
            Book this ride
          </a>
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default JourneyRideDetailsModal;
