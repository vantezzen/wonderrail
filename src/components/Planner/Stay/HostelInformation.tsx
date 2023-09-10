import ValueIndicator from "@/components/Various/ValueIndicator";
import { Button } from "@/components/ui/button";
import { JourneyStay } from "@/lib/types";
import { ExternalLink, RotateCw } from "lucide-react";
import React from "react";
import usePlannerStore from "../plannerStore";
import StaySectionItem from "./StaySectionItem";

function HostelInformation({ stay }: { stay: JourneyStay }) {
  const planner = usePlannerStore((state) => state.planner);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  if (!stay.hostels) return null;

  return (
    <StaySectionItem title="Hostels" className="gap-1">
      <p className="text-sm">
        starting at{" "}
        <span className="font-bold">{stay.hostels.lowestPricePerNight}€</span>
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

      <ValueIndicator values={[stay.hostels.lowestPricePerNight]} postfix="€" />

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
    </StaySectionItem>
  );
}

export default HostelInformation;
