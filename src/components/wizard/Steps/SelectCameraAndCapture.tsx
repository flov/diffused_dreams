"use client";

import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Webcam from "react-webcam";

import { Button, Select, SelectItem } from "@nextui-org/react";
import useWizardNavigation from "../useWizardNavigation";
import { BackButton } from "../../common/BackButton";
import { CapturePhotoForm } from "@/components/form/CapturePhotoForm";

interface CameraProps {
  setBase64Image: Dispatch<SetStateAction<string>>;
}

export const SelectCameraAndCapture: FC<CameraProps> = ({ setBase64Image }) => {
  const { handleNextPage } = useWizardNavigation();

  return (
    <>
      <BackButton page="SelectCameraOrFile" />
      <CapturePhotoForm
        setBase64Image={setBase64Image}
        onSubmit={() => handleNextPage({ nextPage: "SelectGender" })}
      />
    </>
  );
};
