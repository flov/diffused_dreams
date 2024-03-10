import React, { Dispatch, FC, SetStateAction } from "react";
import { SelectGender as SelectGenderForm } from "@/components/form/SelectGender";

type SelectGenderProps = {
  setGender: Dispatch<SetStateAction<string>>;
};

export const ChooseGender: FC<SelectGenderProps> = ({ setGender }) => {
  return (
    <>
      <SelectGenderForm setGender={setGender} nextPage={"ChooseCampaign"} />
    </>
  );
};
