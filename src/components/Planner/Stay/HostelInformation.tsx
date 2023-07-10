import ValueIndicator from "@/components/Various/ValueIndicator";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { JourneyStay } from "@/lib/types";
import { ExternalLink } from "lucide-react";
import React from "react";
import usePlannerStore from "../plannerStore";

function HostelInformation({ stay }: { stay: JourneyStay }) {
  const planner = usePlannerStore((state) => state.planner);

  if (!stay.hostels) return null;

  return (
    <div className="mt-3">
      <Separator className="my-3" />
      <div className="flex justify-between items-center gap-3 flex-col md:flex-row mb-3">
        <p className="text-zinc-500 text-sm">
          Hostels cost{" "}
          <span className="font-bold">{stay.hostels.lowestPricePerNight}€</span>{" "}
          to{" "}
          <span className="font-bold">
            {stay.hostels.highestPricePerNight}€
          </span>{" "}
          per night.
        </p>

        <Button asChild className="w-full">
          <a
            href={planner.hostels.getBookingLink(stay)}
            target="_blank"
            rel="noopener noreferrer"
          >
            See hostels
            <ExternalLink className="ml-2" size={16} />
          </a>
        </Button>
      </div>

      <ValueIndicator values={[stay.hostels.lowestPricePerNight]} postfix="€" />
    </div>
  );
}

export default HostelInformation;
