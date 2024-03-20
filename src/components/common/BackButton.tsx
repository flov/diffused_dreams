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
    <div className="flex justify-between items-center">
      <Button
        color="primary"
        variant="bordered"
        size="sm"
        onClick={() => handleNextPage({ nextPage: page })}
      >
        Back
      </Button>
    </div>
  );
};
