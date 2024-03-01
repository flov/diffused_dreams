import React, { Dispatch, FC, SetStateAction } from "react";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import useWizardNavigation from "../useWizardNavigation";
import { BackButton } from "./BackButton";
import { useEffect } from "react";
import { capitalize } from "@/utils";

type SelectGenderProps = {
  setGender: Dispatch<SetStateAction<string>>;
  base64Image: string;
};

export const SelectGender: FC<SelectGenderProps> = ({
  base64Image,
  setGender,
}) => {
  const { handleNextPage } = useWizardNavigation();

  useEffect(() => {
    if (!base64Image || !prompt) {
      handleNextPage("SelectCameraOrFile");
    }
  }, [base64Image]);

  return (
    <div className="flex flex-col sm:h-2/3 items-center justify-center gap-4 md:gap-8">
      <BackButton nextPage="SelectCameraOrFile" />
      <div className="flex justify-center">
        <h1 className="text-4xl md:text-6xl mb-4">Select your gender</h1>
      </div>
      <div className="flex justify-center w-full flex-wrap md:flex-nowrap gap-4 md:gap-8">
        {["man", "woman"].map((gender) => (
          <GenderCard key={gender} setGender={setGender} gender={gender} />
        ))}
      </div>
      <div className="flex justify-center w-full flex-wrap md:flex-nowrap gap-4 md:gap-8">
        {["boy", "girl"].map((gender) => (
          <GenderCard key={gender} setGender={setGender} gender={gender} />
        ))}
      </div>
    </div>
  );
};

type GenderCardProps = {
  setGender: Dispatch<SetStateAction<string>>;
  gender: string;
};

const GenderCard: FC<GenderCardProps> = ({ gender, setGender }) => {
  const { handleNextPage } = useWizardNavigation();
  const handleGenderSelection = () => {
    setGender(gender);
    handleNextPage("SelectCampaign");
  };

  return (
    <Card
      className="py-4 w-48 h-60 sm:w-60 sm:h-80"
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
