import React, { Dispatch, FC, SetStateAction } from "react";
import { BackButton } from "../../common/BackButton";
import { prompts } from "@/config/prompts";
import { SelectFilter } from "@/components/form/SelectFilter";

type SelectCampaignProps = {
  setCampaign: Dispatch<SetStateAction<string>>;
  gender: string;
  filters: string[];
};

export const SelectCampaign: FC<SelectCampaignProps> = ({
  filters,
  gender,
  setCampaign,
}) => {
  const characters = !!filters.length
    ? prompts(gender).filter((character) => {
        return filters?.includes(character.label);
      })
    : prompts(gender);

  return (
    <>
      <BackButton page="SelectGender" />

      <h1 className="text-center mb-8">Select your filter</h1>
      <SelectFilter
        gender={gender}
        setCampaign={setCampaign}
        filters={filters}
      />
    </>
  );
};
