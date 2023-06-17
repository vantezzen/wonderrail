import Planner from "@/lib/Journey/Planner";
import React from "react";
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

function GeneralJourneySettings({ planner }: { planner: Planner }) {
  const isReadOnly = useIsReadOnly();
  return (
    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
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
            onValueChange={(value) => planner.setPreferredDepartureTime(+value)}
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
            }}
            disabled={isReadOnly}
          />
          <Label htmlFor="public">Make publicly available</Label>
        </div>
      </CardContent>
    </Card>
  );
}

export default GeneralJourneySettings;
