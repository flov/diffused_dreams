import React, { Dispatch, FC, SetStateAction } from "react";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import useWizardNavigation, { Step } from "../wizard/useWizardNavigation";
import { capitalize } from "@/utils";

type SelectWorkflowProps = {
  setWorkflow: Dispatch<SetStateAction<string>>;
  nextPage?: Step;
};

export const SelectWorkflow: FC<SelectWorkflowProps> = ({
  setWorkflow,
  nextPage,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 md:gap-8">
      <div className="flex justify-center w-full flex-wrap md:flex-nowrap gap-2 md:gap-8">
        {/* {["two persons", "single person"].map((workflow) => ( */}
        {["single person"].map((workflow) => ( 
          <GenderCard
            key={workflow}
            setWorkflow={setWorkflow}
            nextPage={nextPage}
            workflow={workflow}
          />
        ))}
      </div>
    </div>
  );
};

type WorkflowCardProps = {
  setWorkflow: Dispatch<SetStateAction<string>>;
  workflow: string;
  nextPage?: Step;
};

const GenderCard: FC<WorkflowCardProps> = ({ nextPage, workflow, setWorkflow }) => {
  const { handleNextPage } = useWizardNavigation();
  const handleWorkflowSelection = () => {
    setWorkflow(workflow);
    handleNextPage({ nextPage: nextPage || "SelectCampaign" });
  };

  return (
    <Card
      className="py-4 w-30 h-60 sm:w-60 sm:h-80"
      isPressable
      isHoverable
      onPress={handleWorkflowSelection}
    >
      <CardHeader className="pb-0 flex justify-center items-start">
        <h4 className="text-large">{capitalize(workflow)}</h4>
      </CardHeader>
      <CardBody className="overflow-visible flex justify-center items-center p-0">
        <Image src={`/${workflow}.png`} alt={workflow} />
      </CardBody>
    </Card>
  );
};
