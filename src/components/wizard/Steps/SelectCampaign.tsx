import React, { Dispatch, FC, SetStateAction } from "react";
import { Card, CardFooter, Image } from "@nextui-org/react";
import useWizardNavigation from "../useWizardNavigation";
import { BackButton } from "./BackButton";
import { useEffect } from "react";

type SelectCampaignProps = {
  setCampaign: Dispatch<SetStateAction<string>>;
  gender: string;
  base64Image: string;
};

export const spaceMarine = (gender: string) =>
  `A high fidelity photography of ${gender} space marine flying trough space Photography, detailed skin, detailed texture, photo-realistic, 8k, highly detailed, full length frame, High detail RAW color art, diffused soft lighting, shallow depth of field, sharp focus, cinematic lighting. In the style of Harry Potter.`;

export const fireFighter = (
  gender: string,
) => `A ${gender} firefighter in gear, holding cat in front of a burning building, looking at viewer, photography, detailed skin, detailed texture, realistic, photo-realistic, 8k, highly detailed, full length frame, High detail RAW color art, diffused soft lighting, shallow depth of field, sharp focus, hyperrealism, cinematic lighting
`;

export const wizard = (gender: string) =>
  `A full body portrait of a ${gender}  in majestic royal robes, in traditional attire wearing a crown, standing on the palace balcony overlooking an ancient kingdom with a vast river, looking at the camera, photography, detailed skin, detailed texture, realistic, photo-realistic, 8k, highly detailed, full length frame, wide shot, High detail RAW color art, diffused soft lighting, shallow depth of field, sharp focus, cinematic lighting`;

type Character = {
  label: string;
  prompt: string;
  image: string;
};

export const characters = (gender: string): Character[] => [
  {
    label: "slayer of cuteness",
    prompt: fireFighter(gender),
    image: "/images/campaign_1.webp",
  },
  {
    label: "for the horde",
    prompt: spaceMarine(gender),
    image: "/images/campaign_2.webp",
  },
  { label: "wizard", prompt: wizard(gender), image: "/images/campaign_3.webp" },
];

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
      <div className="min-h-[calc(100vh - 100px)] items-center justify-center flex flex-col sm:flex-row gap-4 mt-8">
        {characters(gender).map((character) => (
          <Card
            key={character.label}
            isPressable={true}
            isHoverable={true}
            isFooterBlurred
            className="w-full h-[370px] col-span-12 sm:col-span-7"
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
