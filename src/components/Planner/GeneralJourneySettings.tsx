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

function GeneralJourneySettings({ planner }: { planner: Planner }) {
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
          />
        </VerticalInputContainer>
        <VerticalInputContainer>
          <Label>Start date</Label>
          <DatePicker
            date={planner.journey.startDate}
            setDate={(date) => planner.setStartDate(date)}
          />
        </VerticalInputContainer>
        <VerticalInputContainer>
          <Label>Preferred Departure Time</Label>
          <Select
            onValueChange={(value) => planner.setPreferredDepartureTime(+value)}
            defaultValue={String(planner.journey.preferredDepartureTime)}
          >
            <SelectTrigger>
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
      </CardContent>
    </Card>
  );
}

export default GeneralJourneySettings;
