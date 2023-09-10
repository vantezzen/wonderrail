import ValueIndicator from "@/components/Various/ValueIndicator";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { JourneyStay } from "@/lib/types";
import { ExternalLink, RotateCw } from "lucide-react";
import React from "react";
import usePlannerStore from "../plannerStore";

function HostelInformation({ stay }: { stay: JourneyStay }) {
  const planner = usePlannerStore((state) => state.planner);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  if (!stay.hostels) return null;

  return (
    <div className="mt-3">
      <Separator className="my-3" />

      <div className="flex items-center justify-between">
        <h3 className="dark:text-zinc-200 text-zinc-600 font-bold">Hostels</h3>
        <div className="flex items-center gap-1">
          <p className="text-sm">
            starting at{" "}
            <span className="font-bold">
              {stay.hostels.lowestPricePerNight}€
            </span>
          </p>

          <Button
            variant="link"
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
          </Button>

          <ValueIndicator
            values={[stay.hostels.lowestPricePerNight]}
            postfix="€"
          />

          <Button asChild size="sm" variant="brand" className="text-xs ml-1">
            <a
              href={planner.hostels.getBookingLink(stay)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book now
              <ExternalLink className="ml-2" size={16} />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HostelInformation;
