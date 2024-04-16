import React, { Dispatch, FC, SetStateAction } from "react";
import { SelectWorkflow as SelectWorkflowForm } from "@/components/form/SelectWorkflow";
import { BackButton } from "../../common/BackButton";

type SelectWorkflowProps = {
  setWorkflow: Dispatch<SetStateAction<string>>;
};

export const SelectSingleOrTwoPersons: FC<SelectWorkflowProps> = ({ setWorkflow }) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <BackButton page="PrivacyPolicy" />
        <h2 className="text-center">Select your Mode</h2>
        <div></div>
      </div>

      <SelectWorkflowForm setWorkflow={setWorkflow} nextPage="SelectCameraOrFile" />
    </>
  );
};