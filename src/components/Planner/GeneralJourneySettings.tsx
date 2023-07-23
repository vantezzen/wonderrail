import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DatePicker } from "../ui/date-picker";
import { Label } from "../ui/label";
import VerticalInputContainer from "../ui/vertical-input-container";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { padLeft } from "@/lib/utils/number";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { useIsReadOnly } from "@/lib/hooks/useSaveActionStatus";
import usePlannerStore from "./plannerStore";
import { trackEvent } from "@/lib/analytics";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown, Cog } from "lucide-react";

function GeneralJourneySettings() {
  const planner = usePlannerStore((state) => state.planner);
  const isReadOnly = useIsReadOnly();
  const [generalSettingsOpen, setGeneralSettingsOpen] = React.useState(false);
  useEffect(() => {
    if (planner.journey.name === "My Journey") {
      setGeneralSettingsOpen(true);
    }
  }, [planner.journey.name]);

  return (
    <div id="planner-general-settings">
      <Card>
        <Collapsible
          open={generalSettingsOpen}
          onOpenChange={setGeneralSettingsOpen}
        >
          <CollapsibleTrigger asChild>
            <CardHeader className="w-full">
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center">
                  <Cog size={20} className="mr-3" />
                  General settings
                </div>
                <ChevronsUpDown size={16} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="flex flex-col gap-4 pt-6">
              <VerticalInputContainer>
                <Label>Journey name</Label>
                <Input
                  value={planner.journey.name}
                  onChange={(e) => {
                    planner.journey.name = e.target.value;
                    planner.emit("change");
                  }}
                  disabled={isReadOnly}
                />
              </VerticalInputContainer>
              <VerticalInputContainer>
                <Label>Journey description</Label>
                <Input
                  value={planner.journey.description}
                  onChange={(e) => {
                    planner.journey.description = e.target.value;
                    planner.emit("change");
                  }}
                  disabled={isReadOnly}
                />
              </VerticalInputContainer>
              <VerticalInputContainer>
                <Label>Start date</Label>
                <DatePicker
                  date={planner.journey.startDate}
                  setDate={(date) => planner.setStartDate(date)}
                  disabled={isReadOnly}
                />
              </VerticalInputContainer>
              <VerticalInputContainer>
                <Label>Preferred Departure Time</Label>
                <Select
                  onValueChange={(value) =>
                    planner.setPreferredDepartureTime(+value)
                  }
                  defaultValue={String(planner.journey.preferredDepartureTime)}
                >
                  <SelectTrigger disabled={isReadOnly}>
                    <SelectValue placeholder="Select preferred departure time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                        <SelectItem value={String(hour)} key={hour}>
                          {padLeft(hour, 2)}:00
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </VerticalInputContainer>
              <div className="flex gap-3 items-center">
                <Checkbox
                  id="public"
                  checked={planner.journey.isPublic}
                  onCheckedChange={(checked) => {
                    planner.journey.isPublic = Boolean(checked);
                    planner.emit("change");
                    trackEvent(
                      `planner_public_toggle_${checked ? "on" : "off"}`
                    );
                  }}
                  disabled={isReadOnly}
                />
                <Label htmlFor="public">Make publicly available</Label>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
}

export default GeneralJourneySettings;
