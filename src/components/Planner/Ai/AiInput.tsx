import InputDescription from "@/components/Various/InputDescription";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import VerticalInputContainer from "@/components/ui/vertical-input-container";
import { AiRequest } from "@/lib/types";
import React from "react";

function AiInput({
  input,
  setInput,
  onConfirm,
}: {
  input: AiRequest;
  setInput: (input: AiRequest) => void;
  onConfirm: () => void;
}) {
  return (
    <div className="grid gap-3 text-zinc-400">
      <VerticalInputContainer>
        <Label>Start date</Label>
        <InputDescription>
          When do you want to start your journey?
        </InputDescription>
        <DatePicker
          date={input.startDate}
          setDate={(date) => setInput({ ...input, startDate: date! })}
        />
      </VerticalInputContainer>

      <VerticalInputContainer>
        <Label>End date</Label>
        <InputDescription>
          Based on your Interail pass, when does your journey end?
        </InputDescription>
        <DatePicker
          date={input.endDate}
          setDate={(date) => setInput({ ...input, endDate: date! })}
        />
      </VerticalInputContainer>

      <VerticalInputContainer>
        <Label>Start city and country</Label>
        <InputDescription>
          City where you want to start your journey and return to at the end.
          <br />
          If you fly in from outside of Europe, choose the city where you land.
        </InputDescription>
        <Input
          value={input.startCity}
          onChange={(e) => setInput({ ...input, startCity: e.target.value })}
          placeholder="Hamburg, Germany"
        />
      </VerticalInputContainer>

      <VerticalInputContainer>
        <Label>Travel days</Label>
        <InputDescription>
          How many travel days does your Interail pass have?
        </InputDescription>
        <Input
          value={input.travelDays}
          onChange={(e) =>
            setInput({
              ...input,
              travelDays: parseInt(e.target.value) || 0,
            })
          }
          placeholder="7"
        />
      </VerticalInputContainer>

      <VerticalInputContainer>
        <Label>Preferences</Label>
        <InputDescription>
          Write any other preferences and requirements you have for your
          journey.
          <br />
          You can write freely here, but generally short inputs work best.
        </InputDescription>

        <Textarea
          value={input.preferences}
          onChange={(e) => setInput({ ...input, preferences: e.target.value })}
          placeholder="I want to visit the Eiffel Tower in Paris."
        />
      </VerticalInputContainer>

      <Button onClick={onConfirm}>Plan journey</Button>
    </div>
  );
}

export default AiInput;
