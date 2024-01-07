"use client";

import { createImage } from "@/actions";
import { Button } from "@nextui-org/react";

import { FormEvent } from "react";

const GenerateImageForm = () => {
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    createImage("monkey fishing a huge fish in a lake")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  const loadImage = () => {
    // create a new promise that resolves after 2 seconds
    new Promise((resolve) => setTimeout(resolve, 2000)).then(() =>
      console.log("hello"),
    );
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <Button color="primary" type="submit" size="lg">
          Generate!
        </Button>
      </form>
    </>
  );
};

export default GenerateImageForm;
