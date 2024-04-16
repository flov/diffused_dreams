import React, { Dispatch, FC, SetStateAction } from "react";
import { SelectWorkflow as SelectWorkflowForm } from "@/components/form/SelectWorkflow";
import { BackButton } from "../../common/BackButton";

type SelectWorkflowProps = {
  setWorkflow: Dispatch<SetStateAction<string>>;
};

export const SelectSingleOrTwoPersons: FC<SelectWorkflowProps> = ({ setWorkflow }) => {
  return (
    <>
      <div className="flex justify-around">
        <h1 className="text-4xl md:text-6xl mb-4">Select your Mode</h1>
        <BackButton page="PrivacyPolicy" />
        <div></div>
      </div>

      <SelectWorkflowForm setWorkflow={setWorkflow} nextPage="SelectCameraOrFile" />
    </>
  );
};