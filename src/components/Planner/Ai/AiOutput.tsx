import InputDescription from "@/components/Various/InputDescription";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Planner from "@/lib/Journey/Planner";
import React from "react";

function AiOutput({
  planner,
  onApply,
}: {
  planner: Planner;
  onApply: () => void;
}) {
  const itinerary = planner.ai.itinerary!;

  return (
    <div>
      <div className="text-2xl font-bold text-zinc-300">Your journey</div>

      <InputDescription>
        Based on your answers, we have created a journey for you.
        <br />
        If you like it, you can accept it to add it to the planner - from there
        you can edit it as you like.
      </InputDescription>

      <div>
        {itinerary.map((itineraryItem, index) => (
          <Card key={index} className="mt-4">
            <CardHeader className="pb-1">
              <CardTitle>{itineraryItem.location}</CardTitle>
              <CardDescription>{itineraryItem.comment}</CardDescription>
            </CardHeader>
            <CardContent>
              <InputDescription>
                {new Date(itineraryItem.startDate).toLocaleDateString()} -{" "}
                {new Date(itineraryItem.endDate).toLocaleDateString()}
              </InputDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-3 mt-4">
        <Button className="w-full" onClick={onApply}>
          Apply to planner
        </Button>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </div>
    </div>
  );
}

export default AiOutput;
