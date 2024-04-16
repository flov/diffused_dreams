"use client";

import React, { FC, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  SelectCameraOrFile,
  SelectCameraAndCapture,
  SelectFile,
  SelectGender,
  SelectSingleOrTwoPersons,
  SelectCampaign,
  GenerateImage,
  SelectCameraAndFilter,
} from "./Steps";
import { Step } from "./useWizardNavigation";
import { CaptureWithCamera } from "./Steps/CaptureWithCamera";
import { ChooseGender } from "./Steps/ChooseGender";
import { ChooseCampaign } from "./Steps/ChooseCampaign";
import PrivacyPolicyPage from "./Steps/PrivacyPolicy";

type WizardProps = {
  initialStep: Step;
};

export const Wizard: FC<WizardProps> = ({ initialStep }) => {
  const [base64Image, setBase64Image] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [workflow, setWorkflow] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [campaign, setCampaign] = useState<string>("");
  const [filters, setFilters] = useState<string[]>([]);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [workflowID, setWorkflowID] = useState<number>(5); 

  // get query params step and name
  const searchParams = useSearchParams();
  const stepName = searchParams.get("name") || initialStep;

  // switch over stepName and render the appropriate component
  switch (stepName) {
    case "SelectCameraAndFilter":
      return (
        <SelectCameraAndFilter
          selectedDevice={selectedDevice}
          setSelectedDevice={setSelectedDevice}
          filters={filters}
          setFilters={setFilters}
        />
      );
    case "CaptureWithCamera":
      return (
        <CaptureWithCamera
          selectedDevice={selectedDevice}
          setBase64Image={setBase64Image}
        />
      );
    case "SelectCameraOrFile":
      return <SelectCameraOrFile />;
    case "SelectCameraAndCapture":
      return <SelectCameraAndCapture setBase64Image={setBase64Image} workflow={workflow}/>;
    case "SelectFile":
      return (
        <SelectFile setBase64Image={setBase64Image} base64Image={base64Image} workflow={workflow} />
      );
    // We have two wizard flows and we need to handle similar steps slightly different.
    // That's why there is ChooseGender and SelectGender
    case "ChooseGender":
      return <ChooseGender setGender={setGender} />;
    case "SelectGender":
      return <SelectGender setGender={setGender} />;
    case "SelectSingleOrTwoPersons":
      return <SelectSingleOrTwoPersons setWorkflow={setWorkflow} />;
    case "SelectCampaign":
      return (
        <SelectCampaign
          setCampaign={setCampaign}
          setLabel={setLabel}
          setWorkflowID={setWorkflowID}
          gender={gender}
          filters={filters}
          workflow={workflow}
        />
      );
    case "ChooseCampaign":
      return (
        <ChooseCampaign
          setCampaign={setCampaign}
          setLabel={setLabel}
          setWorkflowID={setWorkflowID}
          gender={gender}
          filters={filters}
          workflow={workflow}
        />
      );
    case "GenerateImage":
      return (
        <GenerateImage
          base64Image={base64Image}
          label={label}
          prompt={campaign}
          negativePrompt={campaign}
          flowID={workflowID}
        />
      );
    case "PrivacyPolicy":
      return <PrivacyPolicyPage />;
    default:
      return <SelectCameraOrFile />;
  }
};
