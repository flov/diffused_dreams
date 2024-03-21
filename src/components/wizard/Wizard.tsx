"use client";

import React, { FC, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  SelectCameraOrFile,
  SelectCameraAndCapture,
  SelectFile,
  SelectGender,
  SelectCampaign,
  GenerateImage,
  SelectCameraAndFilter,
} from "./Steps";
import { Step } from "./useWizardNavigation";
import { CaptureWithCamera } from "./Steps/CaptureWithCamera";
import { ChooseGender } from "./Steps/ChooseGender";
import { ChooseCampaign } from "./Steps/ChooseCampaign";

type WizardProps = {
  initialStep: Step;
};

export const Wizard: FC<WizardProps> = ({ initialStep }) => {
  const [base64Image, setBase64Image] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [label, setLabel] = useState();
  const [campaign, setCampaign] = useState<string>("");
  const [filters, setFilters] = useState<string[]>([]);
  const [selectedDevice, setSelectedDevice] = useState("");

  // get query params step and name
  const searchParams = useSearchParams();
  const stepName =
    searchParams.get("name") || initialStep || "SelectCameraOrFile";

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
      return <SelectCameraAndCapture setBase64Image={setBase64Image} />;
    case "SelectFile":
      return (
        <SelectFile setBase64Image={setBase64Image} base64Image={base64Image} />
      );
    // We have two wizard flows and we need to handle similar steps slightly different.
    // That's why there is ChooseGender and SelectGender
    case "ChooseGender":
      return <ChooseGender setGender={setGender} />;
    case "SelectGender":
      return <SelectGender setGender={setGender} />;
    case "SelectCampaign":
      return (
        <SelectCampaign
          setCampaign={setCampaign}
          setLabel={setLabel}
          gender={gender}
          filters={filters}
        />
      );
    case "ChooseCampaign":
      return (
        <ChooseCampaign
          setCampaign={setCampaign}
          gender={gender}
          filters={filters}
        />
      );
    case "GenerateImage":
      return (
        <GenerateImage
          base64Image={base64Image}
          label={label}
          prompt={campaign}
        />
      );
    default:
      return <SelectCameraOrFile />;
  }
};
