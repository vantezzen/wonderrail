import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import VerticalInputContainer from "@/components/ui/vertical-input-container";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsReadOnly } from "@/lib/hooks/useSaveActionStatus";
import usePlannerStore from "../../plannerStore";

import { InterrailPass } from "@/lib/types";
import CountrySelector from "./CountrySelector";
import InputDescription from "@/components/Various/InputDescription";

function PassEditor() {
  const planner = usePlannerStore((state) => state.planner);
  const isReadOnly = useIsReadOnly();

  function setValue(
    key: keyof InterrailPass,
    value: InterrailPass[keyof InterrailPass]
  ) {
    // @ts-ignore
    planner.journey.pass[key] = value;
    planner.emit("change");
  }

  return (
    <div className="p-3">
      <Card>
        <CardContent className="flex flex-col gap-4 pt-3">
          <InputDescription>
            Adding details about your Interrail Pass will help us make sure you
            stay within the limits of your pass.
          </InputDescription>

          <VerticalInputContainer>
            <Label>Pass Type</Label>
            <Select
              onValueChange={(value) => setValue("scope", value)}
              defaultValue={String(planner.journey.pass.scope)}
            >
              <SelectTrigger disabled={isReadOnly}>
                <SelectValue placeholder="Select pass type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="GLOBAL">Global Pass</SelectItem>
                  <SelectItem value="ONE_COUNTRY">One Country Pass</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </VerticalInputContainer>

          {planner.journey.pass.scope === "ONE_COUNTRY" && (
            <CountrySelector
              label="Pass Country"
              description="This is the country you will be travelling in with your One Country Pass."
              value={planner.journey.pass.country}
              setValue={(value) => setValue("country", value)}
            />
          )}

          <CountrySelector
            label="Origin Country"
            value={planner.journey.pass.originCountry}
            setValue={(value) => setValue("originCountry", value)}
            description="This is the country where you will start your journey. If you
                travel from outside Europe, select the country where you will
                arrive in Europe."
          />
          <VerticalInputContainer>
            <Label>Total pass validity</Label>
            <Select
              onValueChange={(value) => {
                setValue("totalValidity", Number(value));
                if (
                  planner.journey.pass.travelDays &&
                  planner.journey.pass.travelDays > Number(value)
                ) {
                  setValue("travelDays", Number(value));
                }
              }}
              defaultValue={String(planner.journey.pass.totalValidity)}
            >
              <SelectTrigger disabled={isReadOnly}>
                <SelectValue placeholder="Select total validity" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="3">3 days</SelectItem>
                  <SelectItem value="4">4 days</SelectItem>
                  <SelectItem value="5">5 days</SelectItem>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="10">10 days</SelectItem>
                  <SelectItem value="15">15 days</SelectItem>
                  <SelectItem value="22">22 days</SelectItem>
                  <SelectItem value="31">1 month</SelectItem>
                  <SelectItem value="62">2 months</SelectItem>
                  <SelectItem value="93">3 months</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </VerticalInputContainer>
          <VerticalInputContainer>
            <Label>Days of travel</Label>
            <Select
              onValueChange={(value) => setValue("travelDays", Number(value))}
              defaultValue={String(planner.journey.pass.travelDays)}
            >
              <SelectTrigger disabled={isReadOnly}>
                <SelectValue placeholder="Select travel days" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="3">3 days</SelectItem>
                  <SelectItem value="4">4 days</SelectItem>
                  <SelectItem value="5">5 days</SelectItem>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="10">10 days</SelectItem>
                  <SelectItem value="15">15 days</SelectItem>
                  <SelectItem value="22">22 days</SelectItem>
                  <SelectItem value="31">1 month</SelectItem>
                  <SelectItem value="62">2 months</SelectItem>
                  <SelectItem value="93">3 months</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </VerticalInputContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default PassEditor;
