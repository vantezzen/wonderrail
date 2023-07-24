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
      <div className="">
        <p className="dark:text-zinc-400 text-zinc-600 text-sm">
          The currency in {country?.name} is{" "}
          <span className="font-bold">
            {currency.currencyName} ({currency.currencyCode})
          </span>
          . Be sure to change your money or pay with card.
        </p>
      </div>
    </div>
  );
}

export default CurrencyInformation;
