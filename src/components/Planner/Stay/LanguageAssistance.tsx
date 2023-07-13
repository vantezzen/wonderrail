import { JourneyStay } from "@/lib/types";
import React from "react";
import languages from "@/data/languageAssistance";
import euroCountries from "@/data/euroCountries";
import { Separator } from "@/components/ui/separator";
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

const ENGLISH_SCORE_DESCRIPTIONS = {
  1: "very few",
  2: "few",
  3: "some",
  4: "most",
  5: "nearly everyone",
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
    <div className="mt-3">
      <Separator className="my-3" />
      <div className="">
        <p className="text-zinc-500 text-sm">
          The main language in{" "}
          <span className="font-bold">{country?.name}</span> is{" "}
          <span className="font-bold">{languageData.language}</span> and{" "}
          <span className="font-bold">
            {
              ENGLISH_SCORE_DESCRIPTIONS[
                Number(
                  languageData.englishScore
                ) as keyof typeof ENGLISH_SCORE_DESCRIPTIONS
              ]
            }
          </span>{" "}
          people speak english.
        </p>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-3 w-full" variant="secondary">
              Show common phrases
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
      </div>
    </div>
  );
}

export default LanguageAssistance;
