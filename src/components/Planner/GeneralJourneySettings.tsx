import Planner from "@/lib/Journey/Planner";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { DatePicker } from "../ui/date-picker";
import { Label } from "../ui/label";
import VerticalInputContainer from "../ui/vertical-input-container";

function GeneralJourneySettings({ planner }: { planner: Planner }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
      </CardHeader>
      <CardContent>
        <VerticalInputContainer>
          <Label>Start date</Label>
          <DatePicker
            date={planner.journey.startDate}
            setDate={(date) => planner.setStartDate(date)}
          />
        </VerticalInputContainer>
      </CardContent>
    </Card>
  );
}

export default GeneralJourneySettings;
