import React from "react";
import currencyData from "@/data/currencyData";
import { JourneyStay } from "@/lib/types";
import euroCountries from "@/data/euroCountries";
import StaySectionItem from "./StaySectionItem";

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
    <StaySectionItem title="Currency">
      <p className="text-sm">
        <span className="font-bold">{currency.currencyName}</span> (
        {currency.currencyCode})
      </p>
    </StaySectionItem>
  );
}

export default CurrencyInformation;
