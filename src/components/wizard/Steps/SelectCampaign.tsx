import React, { Dispatch, FC, SetStateAction } from "react";
import { Card, CardFooter, Image } from "@nextui-org/react";
import useWizardNavigation from "../useWizardNavigation";
import { BackButton } from "./BackButton";
import { useEffect } from "react";
import { prompts } from "@/config/prompts";

type SelectCampaignProps = {
  setCampaign: Dispatch<SetStateAction<string>>;
  gender: string;
  base64Image: string;
};

export const SelectCampaign: FC<SelectCampaignProps> = ({
  setCampaign,
  gender,
  base64Image,
}) => {
  const { handleNextPage } = useWizardNavigation();

  useEffect(() => {
    if (base64Image && !gender) {
      handleNextPage("SelectGender");
    } else if (!base64Image) {
      handleNextPage("SelectCameraOrFile");
    }
  }, [base64Image]);

  return (
    <>
      <BackButton nextPage="SelectGender" />

      <h1 className="text-center mb-8">Select Campaign</h1>
      <div className="grid gap-4 mt-8 mx-auto px-4 sm:grid-cols-2 lg:grid-cols-3">
        {prompts(gender).map((character) => (
          <Card
            key={character.label}
            isPressable={true}
            isHoverable={true}
            isFooterBlurred
            className="min-w-[20rem] w-full h-[370px]"
            onPress={() => {
              setCampaign(character.prompt);
              handleNextPage("GenerateImage");
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
