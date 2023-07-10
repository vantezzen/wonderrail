import ValueIndicator from "@/components/Various/ValueIndicator";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { JourneyStay } from "@/lib/types";
import { ExternalLink, RotateCw } from "lucide-react";
import React from "react";
import usePlannerStore from "../plannerStore";
import { formatDateTime } from "@/lib/utils/date";

function HostelInformation({ stay }: { stay: JourneyStay }) {
  const planner = usePlannerStore((state) => state.planner);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  if (!stay.hostels) return null;

  return (
    <div className="mt-3">
      <Separator className="my-3" />
      <div className="flex gap-3 flex-col">
        <div className="">
          <p className="text-zinc-500 text-sm">
            Hostels cost{" "}
            <span className="font-bold">
              {stay.hostels.lowestPricePerNight}€
            </span>{" "}
            to{" "}
            <span className="font-bold">
              {stay.hostels.highestPricePerNight}€
            </span>{" "}
            per night.
          </p>
          <p className="text-zinc-600 text-xs mb-3">
            Last updated {formatDateTime(stay.hostels.updatedAt)}.
          </p>
        </div>

        {/* <HostelPriceChangeInformation
          datapoints={[...stay.previousHostelData, stay.hostels]}
        /> */}

        <Button asChild className="w-full">
          <a
            href={planner.hostels.getBookingLink(stay)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="mr-2" size={16} />
            See hostels
          </a>
        </Button>

        <Button
          variant="secondary"
          className="w-full"
          onClick={async () => {
            setIsRefreshing(true);
            await planner.updateHostelData(stay);
            setIsRefreshing(false);
          }}
          disabled={isRefreshing}
        >
          <RotateCw
            className={(isRefreshing ? "animate-spin" : "") + " mr-2"}
            size={16}
          />
          Refresh data
        </Button>
      </div>

      <ValueIndicator values={[stay.hostels.lowestPricePerNight]} postfix="€" />
    </div>
  );
}

export default HostelInformation;
