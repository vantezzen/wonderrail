import VerticalInputContainer from "@/components/ui/vertical-input-container";


import React from "react";
import { Label } from "@/components/ui/label";
import { useIsReadOnly } from "@/lib/hooks/useSaveActionStatus";
import euroCountries from "@/data/euroCountries";
import InputDescription from "@/components/Various/InputDescription";
import Combobox from "@/components/ui/combobox";

function CountrySelector({
  label,
  value,
  setValue,
  description,
}: {
  label: string;
  value?: string;
  setValue: (value: string) => void;
  description?: string;
}) {
  const isReadOnly = useIsReadOnly();

  return (
    <VerticalInputContainer>
      <Label>{label}</Label>
      {description && <InputDescription>{description}</InputDescription>}
      <Combobox
        values={euroCountries.map((country) => ({
          value: country.code,
          label: country.name,
        }))}
        value={value}
        setValue={setValue}
        disabled={isReadOnly}
      />
    </VerticalInputContainer>
  );
}

export default CountrySelector;
