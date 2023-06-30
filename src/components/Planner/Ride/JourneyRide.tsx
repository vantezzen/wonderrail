import { JourneyRide } from "@/lib/types";
import { durationBetween, formatDateTime, formatTime } from "@/lib/utils/date";
import {
  ExternalLink,
  FileCheck,
  MapPin,
  Plus,
  Receipt,
  ReplaceAll,
  ShoppingCart,
  Ticket,
  Train,
} from "lucide-react";
import React, { useState } from "react";
import JourneyRideBadge from "./JourneyRideBadge";
import JourneyRideDetailsModal from "./JourneyRideDetailsModal";
import { lookup } from "@/lib/utils/number";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsReadOnly } from "@/lib/hooks/useSaveActionStatus";
import usePlannerStore from "../plannerStore";

function JourneyRide({
  ride,
  addLocationBeforeThisRide,
}: {
  ride: JourneyRide;
  addLocationBeforeThisRide?: () => void;
}) {
  const planner = usePlannerStore((state) => state.planner);
  const duration = durationBetween(ride.timerange.start, ride.timerange.end);

  const isStartEndDateEqual =
    ride.timerange.start.toLocaleDateString() ===
    ride.timerange.end.toLocaleDateString();

  const isReadonly = useIsReadOnly();

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <div className="flex xl:items-center gap-4 text-zinc-600 w-full flex-col xl:flex-row">
      <Train className="hidden xl:block" size={16} />

      <div className="mr-auto">
        <div className=" font-bold text-sm text-zinc-200">{ride.name}</div>
        <div className=" text-sm">
          {duration}h (
          <span suppressHydrationWarning>
            {isStartEndDateEqual ? (
              <>
                {formatDateTime(ride.timerange.start)} -{" "}
                {formatTime(ride.timerange.end)}
              </>
            ) : (
              <>
                {formatDateTime(ride.timerange.start)} -{" "}
                {formatDateTime(ride.timerange.end)}
              </>
            )}
          </span>
          )
        </div>

        <div className="flex gap-1 mt-2" onClick={() => setIsDetailsOpen(true)}>
          {ride.needsReservation ? (
            <Tooltip>
              <TooltipTrigger>
                <JourneyRideBadge
                  icon={<Ticket className="" size={16} />}
                  className="bg-pink-700 hover:bg-pink-700"
                />
              </TooltipTrigger>

              <TooltipContent>This ride requires a reservation</TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger>
                <JourneyRideBadge
                  icon={<FileCheck className="" size={16} />}
                  className="bg-emerald-700 hover:bg-emerald-700"
                />
              </TooltipTrigger>

              <TooltipContent>This ride requires no reservation</TooltipContent>
            </Tooltip>
          )}
          {ride.price && ride.price > 0 && (
            <Tooltip>
              <TooltipTrigger>
                <JourneyRideBadge
                  icon={<Receipt className="" size={16} />}
                  className={lookup(ride.price, {
                    0: "bg-green-700 hover:bg-green-700",
                    20: "bg-amber-700 hover:bg-amber-700",
                    40: "bg-red-700 hover:bg-red-700",
                  })}
                >
                  {ride.price}€
                </JourneyRideBadge>
              </TooltipTrigger>
              <TooltipContent>
                Total price for <strong>mandatory</strong> reservations.
              </TooltipContent>
            </Tooltip>
          )}
          {ride.changes > 0 && (
            <Tooltip>
              <TooltipTrigger>
                <JourneyRideBadge
                  icon={<ReplaceAll className="" size={16} />}
                  className={lookup(ride.changes, {
                    0: "bg-green-700 hover:bg-green-700",
                    2: "bg-amber-700 hover:bg-amber-700",
                    4: "bg-red-700 hover:bg-red-700",
                  })}
                >
                  {ride.changes}
                </JourneyRideBadge>
              </TooltipTrigger>

              <TooltipContent>
                This ride has {ride.changes}{" "}
                {ride.changes > 1 ? "changes" : "change"}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <JourneyRideDetailsModal
          ride={ride}
          open={isDetailsOpen}
          setIsOpen={setIsDetailsOpen}
        />

        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="secondary"
              size="sm"
              className="relative"
              disabled={isReadonly}
              onClick={addLocationBeforeThisRide}
            >
              <MapPin size={16} className="opacity-0" />
              <MapPin size={13} className="absolute top-[30%] left-[30%]" />

              <Plus
                size={15}
                strokeWidth={2}
                className="absolute top-[45%] left-[45%]"
              />
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            Add another location between these locations
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button variant="secondary" size="sm" asChild>
              <a
                href={planner.interrail.getBookingUrl(ride)}
                target="_blank"
                rel="noreferrer"
              >
                <ShoppingCart size={16} />
              </a>
            </Button>
          </TooltipTrigger>

          <TooltipContent className="flex gap-2 items-center">
            Book reservations
            <ExternalLink size={16} />
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

export default JourneyRide;
