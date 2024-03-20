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
      <div className="flex justify-between items-center">
        <BackButton page="ChooseGender" />
        <h2 className="text-center">Select your filter</h2>
        <div></div>
      </div>
      <SelectFilter
        gender={gender}
        setCampaign={setCampaign}
        filters={filters}
        nextPage="CaptureWithCamera"
      />
    </>
  );
};
