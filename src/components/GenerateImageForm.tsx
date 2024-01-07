"use client";

import { Button } from "@nextui-org/react";
import { FC } from "react";

const GenerateImageForm: FC = () => {
  const loadImage = () => {
    // create a new promise that resolves after 2 seconds
    new Promise((resolve) => setTimeout(resolve, 2000)).then(() =>
      console.log("hello"),
    );
  };

  return (
    <Button onClick={loadImage} size="lg">
      Generate!
    </Button>
  );
};

export default GenerateImageForm;
