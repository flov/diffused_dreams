import React, { Dispatch, FC, SetStateAction } from "react";
import { BackButton } from "../../common/BackButton";
import { prompts } from "@/config/prompts";
import { SelectFilter } from "@/components/form/SelectFilter";

type SelectCampaignProps = {
  setPosPrompt: Dispatch<SetStateAction<string>>;
  setNegPrompt: Dispatch<SetStateAction<string>>;
  setLabel: Dispatch<SetStateAction<string>>;
  setWorkflowID: Dispatch<SetStateAction<number>>;
  gender: string;
  workflow: string;
  filters: string[];
};

export const SelectCampaign: FC<SelectCampaignProps> = ({
  filters,
  gender,
  workflow,
  setPosPrompt,
  setNegPrompt,
  setLabel,
  setWorkflowID,
}) => {
  const characters = !!filters.length
    ? prompts(gender).filter((character) => {
        return filters?.includes(character.label);
      })
    : prompts(gender);

  return (
    <>
      <div className="flex justify-between items-center">
        <BackButton page="SelectGender" />
        <h2 className="text-center">Select your filter</h2>
        <div></div>
      </div>
      <SelectFilter
        gender={gender}
        setPosPrompt={setPosPrompt}
        setNegPrompt={setNegPrompt}
        setLabel={setLabel}
        setWorkflowID={setWorkflowID}
        filters={filters}
        workflow={workflow}
      />
    </>
  );
};
