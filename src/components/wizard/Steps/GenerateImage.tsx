import React, { FC, use, useEffect, useState } from "react";
import { RWebShare } from "react-web-share";

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
  const generatedImageUrl =
    status && status.status === "COMPLETED" ? status.output.images : undefined;

  const handleDownload = () => {
    if (generatedImageUrl) {
      const link = document.createElement("a");
      link.href = generatedImageUrl;
      link.download = "generated-image.jpg";
      link.click();
    }
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
            <Image src={generatedImageUrl} alt="Generated image" />
            <div className="mt-4 flex flex-col sm:flex gap-4">
              <Button size="lg" variant="bordered" onClick={handleDownload}>
                Download Image
              </Button>
              <RWebShare
                data={{
                  text: "My new badass AI character",
                  url: generatedImageUrl,
                }}
                onClick={() => console.log("shared successfully!")}
              >
                <Button size="lg" variant="bordered">
                  Share 🔗
                </Button>
              </RWebShare>
            </div>
            <div className="mt-4 flex gap-4">
              <Button
                size="lg"
                variant="bordered"
                onClick={() => handleNextPage("SelectCameraOrFile")}
              >
                Exit
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
