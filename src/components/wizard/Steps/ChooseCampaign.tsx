import React, { Dispatch, FC, SetStateAction } from "react";
import { BackButton } from "../../common/BackButton";
import { prompts } from "@/config/prompts";
import { SelectFilter } from "@/components/form/SelectFilter";

type SelectCampaignProps = {
  setPosPrompt: Dispatch<SetStateAction<string>>;
  setLabel: Dispatch<SetStateAction<string>>;
  setNegPrompt: Dispatch<SetStateAction<string>>;
  setWorkflowID: Dispatch<SetStateAction<number>>;
  gender: string;
  filters: string[];
  workflow: string;
};

// There is Choose campaign and Select Campaign, two similar
// components which are used for two different wizard flows.
export const ChooseCampaign: FC<SelectCampaignProps> = ({
  filters,
  gender,
  setPosPrompt,
  setLabel,
  setNegPrompt,
  setWorkflowID,
  workflow,
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <BackButton page="ChooseGender" />
        <h2 className="text-center">Select your filter</h2>
        <div className="w-12"></div>
      </div>
      <SelectFilter
        gender={gender}
        setLabel={setLabel}
        setPosPrompt={setPosPrompt}
        setNegPrompt={setNegPrompt}
        setWorkflowID={setWorkflowID}
        filters={filters}
        workflow={workflow}
      />
    </>
  );
};
