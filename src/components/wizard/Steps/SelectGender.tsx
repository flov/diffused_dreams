import React, { Dispatch, FC, SetStateAction } from "react";
import { SelectGender as SelectGenderForm } from "@/components/form/SelectGender";
import { BackButton } from "../../common/BackButton";

type SelectGenderProps = {
  setGender: Dispatch<SetStateAction<string>>;
};

export const SelectGender: FC<SelectGenderProps> = ({ setGender }) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <BackButton page="SelectCameraOrFile" />
        <h2 className="text-center">Select your gender</h2>
        <div></div>
      </div>

      <SelectGenderForm setGender={setGender} nextPage="ChooseCampaign"/>
    </>
  );
};
