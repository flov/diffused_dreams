import React, { FC, use, useEffect, useState } from "react";

import { RunResponse, StatusResponse } from "@/types";
import { GenerateImagePayload } from "@/types/api/generate-image";
import useWizardNavigation from "../useWizardNavigation";
import { Button, CircularProgress, Image } from "@nextui-org/react";
import ShowStatus from "@/components/images/ShowStatus";
import { BackButton } from "./BackButton";

type GenerateImageProps = {
  base64Image: string;
  prompt: string;
};

export const GenerateImage: FC<GenerateImageProps> = ({
  base64Image,
  prompt,
}) => {
  const [run, setRun] = useState<RunResponse>();
  const [status, setStatus] = useState<StatusResponse>();

  const { handleNextPage } = useWizardNavigation();

  const generateImage = async (payload: GenerateImagePayload) => {
    const body = JSON.stringify({
      ...payload,
      // remove the data:image/jpeg;base64, prefix
      base64Image: base64Image.split(",")[1],
    });
    const res = await fetch("/api/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    const runData = (await res.json()) as RunResponse;

    setRun(runData);
    setStatus({ id: "0", status: "IN_QUEUE" });
  };

  useEffect(() => {
    // call generateImage when the component mounts
    // if base64Image and prompt is empty, redirect to home
    if (!base64Image || !prompt) {
      handleNextPage("SelectCameraOrFile");
    }
    console.log("you should see me only once");
    generateImage({
      base64Image,
      positivePrompt: prompt,
      negativePrompt: "nsfw",
      flowId: 5,
    });
  }, []);

  useEffect(() => {
    const pollStatus = async () => {
      if (run) {
        while (status?.status !== "COMPLETED" && status?.status !== "FAILED") {
          const res = await fetch(`/api/status/${run.id}`);
          const statusData = await res.json();
          setStatus(statusData);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          // Wait for 1 second before polling again
        }
      }
    };

    pollStatus();
  }, [run]);

  const hasCompleted = status && status.status === "COMPLETED";
  const generatedImage =
    status && status.status === "COMPLETED" ? status.output.images : undefined;

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement("a");
      link.href = generatedImage;
      link.download = "generated-image.jpg";
      link.click();
    }
  };

  const shareOnSocialMedia = () => {
    console.log("share");
  };

  return (
    <>
      <BackButton nextPage="SelectCampaign" />

      <div
        className="flex flex-col items-center justify-center h-full"
        style={{ minHeight: "calc(100vh - 200px)" }}
      >
        {hasCompleted ? (
          <>
            <Image src={generatedImage} alt="Generated image" />
            <div className="mt-4">
              <Button onClick={handleDownload}>Download Image</Button>
              <Button onClick={shareOnSocialMedia}>
                Share on social media
              </Button>
            </div>
          </>
        ) : status ? (
          <CircularProgress
            classNames={{
              svg: "w-36 h-36 drop-shadow-md",
              indicator: "stroke-white",
              track: "stroke-white/10",
              value: "text-3xl font-semibold text-white",
            }}
            label="Generating image, please wait..."
          />
        ) : null}
        <ShowStatus status={status} />
      </div>
    </>
  );
};
