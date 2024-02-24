import React, { FC } from "react";
import type { Step } from "../useWizardNavigation";
import { Button } from "@nextui-org/react";
import useWizardNavigation from "../useWizardNavigation";

type BackButtonProps = {
  nextPage: Step;
};

export const BackButton: FC<BackButtonProps> = ({ nextPage }) => {
  const { handleNextPage } = useWizardNavigation();
  return (
    <div className="flex justify-between items-center fixed top-2 left-0 right-0 p-4">
      <div className="flex items-center">
        <Button onClick={() => handleNextPage(nextPage)}>Back</Button>
      </div>
    </div>
  );
};
