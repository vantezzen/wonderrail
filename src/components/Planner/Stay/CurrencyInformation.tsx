import { Separator } from "@/components/ui/separator";
import React from "react";
import currencyData from "@/data/currencyData";
import { JourneyStay } from "@/lib/types";
import euroCountries from "@/data/euroCountries";

function CurrencyInformation({ stay }: { stay: JourneyStay }) {
  const currency =
    stay.countryCode &&
    currencyData[stay.countryCode.toUpperCase() as keyof typeof currencyData];

  if (!currency || currency.currencyCode === "EUR") {
    return null;
  }
  const country = euroCountries.find(
    (country) => country.code === stay.countryCode
  );

  return (
    <div className="mt-3">
      <Separator className="my-3" />

      <div className="flex items-center justify-between">
        <h3 className="dark:text-zinc-200 text-zinc-600 font-bold">Currency</h3>
        <div className="flex items-center gap-3">
          <p className="text-sm">
            <span className="font-bold">{currency.currencyName}</span> (
            {currency.currencyCode})
          </p>
        </div>
      </div>
    </div>
  );
}

export default CurrencyInformation;
