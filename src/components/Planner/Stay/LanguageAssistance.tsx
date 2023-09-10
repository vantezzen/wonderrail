import { JourneyStay } from "@/lib/types";
import React from "react";
import languages from "@/data/languageAssistance";
import euroCountries from "@/data/euroCountries";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import StaySectionItem from "./StaySectionItem";

const ENGLISH_SCORE_DESCRIPTIONS = {
  1: "Very low",
  2: "Low",
  3: "Medium",
  4: "Average",
  5: "High",
};

function LanguageAssistance({ stay }: { stay: JourneyStay }) {
  const languageData =
    stay.countryCode &&
    languages[stay.countryCode.toUpperCase() as keyof typeof languages];

  if (!languageData) {
    return null;
  }
  const country = euroCountries.find(
    (country) => country.code === stay.countryCode
  );

  return (
    <StaySectionItem title="Language">
      <p className="text-sm">
        Main language <span className="font-bold">{languageData.language}</span>
      </p>
      <p className="text-sm">
        English proficiency{" "}
        <span className="font-bold">
          {
            ENGLISH_SCORE_DESCRIPTIONS[
              Number(
                languageData.englishScore
              ) as keyof typeof ENGLISH_SCORE_DESCRIPTIONS
            ]
          }
        </span>
      </p>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="brand" size="sm" className="text-xs">
            Common phrases
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogTitle>Common phrases in {languageData.language}</DialogTitle>

          <DialogDescription>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>English</TableHead>
                  <TableHead>{languageData.language}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(languageData.commonPhases).map(
                  ([english, translation]) => (
                    <TableRow key={english}>
                      <TableCell>{english}</TableCell>
                      <TableCell>{translation}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </StaySectionItem>
  );
}

export default LanguageAssistance;
