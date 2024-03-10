import React, { Dispatch, FC, SetStateAction } from "react";
import { BackButton } from "../../common/BackButton";
import { prompts } from "@/config/prompts";
import { SelectFilter } from "@/components/form/SelectFilter";

type SelectCampaignProps = {
  setCampaign: Dispatch<SetStateAction<string>>;
  gender: string;
  filters: string[];
};

// There is Choose campaign and Select Campaign, two similar
// components which are used for two different wizard flows.
export const ChooseCampaign: FC<SelectCampaignProps> = ({
  filters,
  gender,
  setCampaign,
}) => {
  return (
    <>
      <BackButton page="ChooseGender" />

      <h1 className="text-center mb-8">Select your filter</h1>
      <SelectFilter
        gender={gender}
        setCampaign={setCampaign}
        filters={filters}
        nextPage="CaptureWithCamera"
      />
    </>
  );
};
