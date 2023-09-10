import { JourneyStay } from "@/lib/types";
import React, { useEffect } from "react";
import usePlannerStore from "../plannerStore";
import StaySectionItem from "./StaySectionItem";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getTimerangeLengthToDaysInMs } from "@/lib/utils/date";
import { useIsReadOnly } from "@/lib/hooks/useSaveActionStatus";
import { Calendar } from "lucide-react";

function StayDuration({ stay }: { stay: JourneyStay }) {
  const planner = usePlannerStore((state) => state.planner);
  const [isEditing, setIsEditing] = React.useState(false);
  const isReadOnly = useIsReadOnly();

  const days =
    getTimerangeLengthToDaysInMs(stay.timerange) / 1000 / 60 / 60 / 24;
  const [changedDays, setChangedDays] = React.useState(days);
  useEffect(() => {
    setChangedDays(days);
  }, [days]);

  const isStartEndDateEqual =
    stay.timerange.start.toLocaleDateString() ===
    stay.timerange.end.toLocaleDateString();

  return (
    <StaySectionItem title="Duration">
      {isEditing ? (
        <>
          <Input
            className="w-14 h-8"
            type="number"
            value={changedDays}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (isNaN(value)) return;
              setChangedDays(value);
            }}
            disabled={isReadOnly}
          />{" "}
          {changedDays !== 1 ? "days" : "day"}
          <Button
            onClick={() => {
              planner.changeStayDuration(stay, changedDays);
              setIsEditing(false);
            }}
            variant="secondary"
            size="sm"
            disabled={isReadOnly}
          >
            <Calendar className="inline-block mr-2" size={14} />
            Update
          </Button>
        </>
      ) : (
        <>
          <p className="text-sm font-medium">
            <span suppressHydrationWarning>
              {isStartEndDateEqual
                ? stay.timerange.start.toLocaleDateString()
                : stay.timerange.start.toLocaleDateString() +
                  " - " +
                  stay.timerange.end.toLocaleDateString()}
            </span>
          </p>

          {!isReadOnly && (
            <Button
              size="sm"
              variant="ghost"
              className="text-xs ml-1"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              <Edit2 size={16} />
            </Button>
          )}
        </>
      )}
    </StaySectionItem>
  );
}

export default StayDuration;
