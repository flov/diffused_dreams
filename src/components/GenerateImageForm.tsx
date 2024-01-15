"use client";

import { GenerateImageApiResponse } from "@/types";
import { Button, Input } from "@nextui-org/react";

import { FormEvent, useState } from "react";

const GenerateImageForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<GenerateImageApiResponse>();
  const [prompt, setPrompt] = useState(
    "beautiful lady, (freckles), frowning, blue eyes, fuzzy messy hair, dark makeup, hyperdetailed photography, apocalyptic scenario",
  );

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const res = await fetch("/api/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt),
    });
    const data = (await res.json()) as GenerateImageApiResponse;
    setImage(data);
    setIsLoading(false);
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            required={true}
            size="md"
            type="text"
            label="prompt"
            placeholder="Enter your prompt"
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
          />
        </div>
        <Button isLoading={isLoading} color="primary" type="submit" size="lg">
          Generate!
        </Button>

        {image && image.output.status === "success" && (
          <img src={image.output.message} alt="generated image" />
        )}
      </form>
    </>
  );
};

export default GenerateImageForm;
