import React, { Dispatch, FC, SetStateAction } from "react";
import { BackButton } from "../../common/BackButton";
import { CapturePhotoForm } from "@/components/form/CapturePhotoForm";
import useWizardNavigation from "../useWizardNavigation";

interface CaptureWithCameraProps {
  setBase64Image: Dispatch<SetStateAction<string>>;
  selectedDevice: string;
}

export const CaptureWithCamera: FC<CaptureWithCameraProps> = ({
  setBase64Image,
  selectedDevice,
}) => {
  const { handleNextPage } = useWizardNavigation();
  return (
    <>
      <BackButton page="ChooseCampaign" />
      <CapturePhotoForm
        alreadySelectedCamera={true}
        selectedDevice={selectedDevice}
        setBase64Image={setBase64Image}
        onSubmit={() => handleNextPage({ nextPage: "GenerateImage" })}
      />
    </>
  );
};
