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
import { ArrowRight, ClipboardList, TextQuote, Train, X } from "lucide-react";
import React from "react";
import JourneyRideLeg from "./JourneyRideLeg";

function JourneyRideDetailsModal({ ride }: { ride: JourneyRide }) {
  console.log(ride);
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="secondary" size="sm">
          <TextQuote size={16} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="min-w-[70vw]">
        <AlertDialogHeader className="text-slate-300">
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
