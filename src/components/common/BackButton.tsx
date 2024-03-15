import React, { FC } from "react";
import type { Step } from "../wizard/useWizardNavigation";
import { Button } from "@nextui-org/react";
import useWizardNavigation from "../wizard/useWizardNavigation";

type BackButtonProps = {
  page: Step;
};

export const BackButton: FC<BackButtonProps> = ({ page }) => {
  const { handleNextPage } = useWizardNavigation();
  return (
    <div className="flex justify-between items-center fixed top-20 left-4 z-2">
      <div className="flex items-center">
        <Button
          color="primary"
          variant="bordered"
          onClick={() => handleNextPage({ nextPage: page })}
        >
          Back
        </Button>
      </div>
    </div>
  );
};
