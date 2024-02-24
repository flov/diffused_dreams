"use client";

import React, { FC, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  SelectCameraOrFile,
  SelectCamera,
  SelectFile,
  SelectGender,
  SelectCampaign,
  GenerateImage,
} from "./Steps";

export const Wizard: FC = () => {
  const [base64Image, setBase64Image] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [campaign, setCampaign] = useState<string>("");

  // get query params step and name
  const searchParams = useSearchParams();
  const stepName = searchParams.get("name") || "SelectCameraOrFile";
  const step = searchParams.get("step") || 1;

  console.log({ base64Image, gender, campaign });

  // switch over stepName and render the appropriate component
  switch (stepName) {
    case "SelectCameraOrFile":
      return <SelectCameraOrFile />;
    case "SelectCamera":
      return <SelectCamera setBase64Image={setBase64Image} />;
    case "SelectFile":
      return (
        <SelectFile setBase64Image={setBase64Image} base64Image={base64Image} />
      );
    case "SelectGender":
      return <SelectGender setGender={setGender} />;
    case "SelectCampaign":
      return <SelectCampaign setCampaign={setCampaign} gender={gender} />;
    case "GenerateImage":
      return <GenerateImage base64Image={base64Image} prompt={campaign} />;
    default:
      return <SelectCameraOrFile />;
  }
};
