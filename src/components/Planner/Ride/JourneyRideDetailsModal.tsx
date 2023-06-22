import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { JourneyRide } from "@/lib/types";
import { TextQuote, X } from "lucide-react";
import React from "react";
import JourneyRideLeg from "./JourneyRideLeg";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function JourneyRideDetailsModal({ ride }: { ride: JourneyRide }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="secondary" size="sm">
              <TextQuote size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Ride details</TooltipContent>
        </Tooltip>
      </AlertDialogTrigger>

      <AlertDialogContent className="min-w-[70vw]">
        <AlertDialogHeader className="text-zinc-300">
          <div className="flex justify-between items-center">
            <div>{ride.name}</div>

            <AlertDialogCancel asChild>
              <Button variant="ghost" size="sm">
                <X size={16} />
              </Button>
            </AlertDialogCancel>
          </div>
        </AlertDialogHeader>
        <AlertDialogDescription></AlertDialogDescription>

        {ride.details?.legs.map((leg) => (
          <>
            <hr />
            <JourneyRideLeg leg={leg} />
          </>
        ))}
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default JourneyRideDetailsModal;
