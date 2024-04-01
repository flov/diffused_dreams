import React, { Dispatch, FC, SetStateAction } from "react";
import { SelectGender as SelectGenderForm } from "@/components/form/SelectGender";
import { BackButton } from "../../common/BackButton";

type SelectGenderProps = {
  setGender: Dispatch<SetStateAction<string>>;
};

export const SelectGender: FC<SelectGenderProps> = ({ setGender }) => {
  return (
    <>
      <div className="flex justify-around">
        <BackButton page="SelectCameraOrFile" />
        <h3 className="text-4xl md:text-6xl mb-4">Select your gender</h3>
        <div></div>
      </div>

      <SelectGenderForm setGender={setGender} />
    </>
  );
};
