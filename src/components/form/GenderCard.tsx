import React, { FC, Dispatch, SetStateAction } from "react";
import { Image, Card, CardBody, CardHeader } from "@nextui-org/react";
import useWizardNavigation from "../wizard/useWizardNavigation";
import { capitalize } from "@/utils";

export type GenderCardProps = {
  setGender: Dispatch<SetStateAction<string>>;
  gender: string;
};

export const GenderCard: FC<GenderCardProps> = ({ gender, setGender }) => {
  const { handleNextPage } = useWizardNavigation();
  const handleGenderSelection = () => {
    setGender(gender);
    handleNextPage({ nextPage: "SelectCampaign" });
  };

  return (
    <Card
      className="py-4 w-30 h-60 sm:w-60 sm:h-80"
      isPressable
      isHoverable
      onPress={handleGenderSelection}
    >
      <CardHeader className="pb-0 flex justify-center items-start">
        <h4 className="text-large">{capitalize(gender)}</h4>
      </CardHeader>
      <CardBody className="overflow-visible flex justify-center items-center p-0">
        <Image src={`/${gender}.png`} alt={gender} />
      </CardBody>
    </Card>
  );
};
