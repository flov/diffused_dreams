import React, { Dispatch, FC, SetStateAction } from "react";
import { SelectGender as SelectGenderForm } from "@/components/form/SelectGender";
import { BackButton } from "../../common/BackButton";

type SelectGenderProps = {
  setGender: Dispatch<SetStateAction<string>>;
};

export const SelectGender: FC<SelectGenderProps> = ({ setGender }) => {
  return (
    <>
      <BackButton page="SelectCameraOrFile" />
      <SelectGenderForm setGender={setGender} />
    </>
  );
};
