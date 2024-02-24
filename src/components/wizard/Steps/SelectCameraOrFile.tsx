import React, { FC } from "react";
import useWizardNavigation from "../useWizardNavigation";
import { Button } from "@nextui-org/react";

export const SelectCameraOrFile: FC = () => {
  const { handleNextPage } = useWizardNavigation();

  return (
    <div className="flex justify-center gap-8 w-full">
      <Button
        size="lg"
        color="primary"
        variant="bordered"
        onClick={() => handleNextPage("SelectFile")}
      >
        Upload image
      </Button>
      <Button
        size="lg"
        color="primary"
        variant="bordered"
        onClick={() => handleNextPage("SelectCamera")}
      >
        Take a photo
      </Button>
    </div>
  );
};
