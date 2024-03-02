import React, { FC } from "react";
import { CameraRetroIcon, ImageIcon } from "@/icons";
import { CardButton } from "@/components/common/CardButton";
import useWizardNavigation from "../useWizardNavigation";

export const SelectCameraOrFile: FC = () => {
  const { handleNextPage } = useWizardNavigation();
  return (
    <div
      style={{ height: "70vh" }}
      className="flex h-70vh flex-col sm:flex-row items-center justify-center gap-8 w-full"
    >
      <CardButton
        text="Upload a photo"
        onPress={() => handleNextPage("SelectFile")}
        icon={ImageIcon}
      />
      <CardButton
        text="Take a photo"
        onPress={() => handleNextPage("SelectCamera")}
        icon={CameraRetroIcon}
      />
    </div>
  );
};
