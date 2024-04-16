import React, { FC } from "react";
import { CameraRetroIcon, ImageIcon } from "@/icons";
import { CardButton } from "@/components/common/CardButton";
import { BackButton } from "@/components/common/BackButton";
import useWizardNavigation from "../useWizardNavigation";

export const SelectCameraOrFile: FC = () => {
  const { handleNextPage } = useWizardNavigation();
  return (
    <>
    <BackButton page="SelectCameraOrFile" />
    <div
      style={{ height: "60vh" }}
      className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full"
    >
      <CardButton
        text="Upload a photo"
        onPress={() => handleNextPage({ nextPage: "SelectFile" })}
        icon={ImageIcon}
      />
      <CardButton
        text="Take a photo"
        onPress={() => handleNextPage({ nextPage: "SelectCameraAndCapture" })}
        icon={CameraRetroIcon}
      />
    </div>
    </>
  );
};
