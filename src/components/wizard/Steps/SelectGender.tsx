import React, { Dispatch, FC, SetStateAction } from "react";
import { Card, CardFooter, Image } from "@nextui-org/react";
import useWizardNavigation from "../useWizardNavigation";
import { BackButton } from "./BackButton";

type SelectGenderProps = {
  setGender: Dispatch<SetStateAction<string>>;
};

export const SelectGender: FC<SelectGenderProps> = ({ setGender }) => {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex justify-center">
        <h1 className="text-4xl md:text-6xl mb-4">Select your gender</h1>
      </div>
      <div className="flex justify-center w-full flex-wrap md:flex-nowrap gap-4">
        {["man", "woman"].map((gender) => (
          <GenderCard key={gender} setGender={setGender} gender={gender} />
        ))}
      </div>
      <div className="flex justify-center w-full flex-wrap md:flex-nowrap gap-4">
        {["boy", "girl"].map((gender) => (
          <GenderCard key={gender} setGender={setGender} gender={gender} />
        ))}
      </div>
    </div>
  );
};

const GenderCard: FC<{ gender: string } & SelectGenderProps> = ({
  gender,
  setGender,
}) => {
  const { handleNextPage } = useWizardNavigation();
  const handleGenderSelection = () => {
    setGender(gender);
    handleNextPage("SelectCampaign");
  };
  return (
    <>
      <BackButton nextPage="SelectCameraOrFile" />
      <Card
        isPressable
        isFooterBlurred
        onPress={handleGenderSelection}
        radius="lg"
        className="border-none"
      >
        <Image
          src={`/${gender}.png`}
          className="object-cover"
          alt="Picture of a boy"
        />
        <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          {gender}
        </CardFooter>
      </Card>
    </>
  );
};
