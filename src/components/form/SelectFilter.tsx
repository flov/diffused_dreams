import React, { Dispatch, FC, SetStateAction } from "react";
import { Card, CardFooter, Image } from "@nextui-org/react";
import useWizardNavigation, { Step } from "../wizard/useWizardNavigation";
import { prompts } from "@/config/prompts";

type SelectCampaignProps = {
  setPosPrompt: Dispatch<SetStateAction<string>>;
  setLabel: Dispatch<SetStateAction<string>>;
  setNegPrompt: Dispatch<SetStateAction<string>>;
  setWorkflowID: Dispatch<SetStateAction<number>>;
  gender: string;
  filters: string[];
  nextPage?: Step;
  workflow: string;
};

export const SelectFilter: FC<SelectCampaignProps> = ({
  filters,
  gender,
  setPosPrompt,
  setNegPrompt,
  setLabel,
  setWorkflowID,  
  nextPage,
  workflow,
}) => {
  const { handleNextPage } = useWizardNavigation();
  const characters = !!filters.length
    ? prompts(workflow === "two persons" ? "two persons" : gender).filter((character) => {
        return filters?.includes(character.label);
      })
    : prompts(workflow === "two persons" ? "two persons" : gender);
  return (
    <>
      <div className="grid gap-4 my-8 mx-auto px-4 sm:grid-cols-2 lg:grid-cols-3">
        {characters.map((character) => (
          <Card
            key={character.label}
            isPressable={true}
            isHoverable={true}
            isFooterBlurred
            className="min-w-[20rem] w-full h-[370px]"
            onPress={() => {
              setPosPrompt(character.prompt);
              setNegPrompt(character.negativePrompt);
              setLabel(character.label);
              setWorkflowID(character.flowID);
              handleNextPage({ nextPage: nextPage || "GenerateImage" });
            }}
          >
            <Image
              alt="Character image"
              className="z-0 w-full h-full object-cover"
              src={character.image}
            />
            <CardFooter className="absolute justify-center bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 font-bold">
              {character.label}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};
