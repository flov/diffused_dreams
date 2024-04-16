import React, { FC, useEffect, useState } from "react";

import { RunResponse, StatusResponse } from "@/types";
import { GenerateImagePayload } from "@/types/api/generate-image";
import useWizardNavigation from "../useWizardNavigation";
import { BackButton } from "../../common/BackButton";
import { IsLoading } from "@/components/common/IsLoading";
import { ShowGeneratedImage } from "../../common/ShowGeneratedImage";
import { ShowStatus } from "@/components/common/ShowStatus";
import { useUser } from "@/providers/userProvider";
import { payUserTokens } from "@/db/queries/users";

type GenerateImageProps = {
  base64Image: string;
  prompt: string;
  negativePrompt: string;
  label: string;
  flowID: number;
};

export const GenerateImage: FC<GenerateImageProps> = ({
  base64Image,
  prompt,
  negativePrompt,
  label,
  flowID,
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

    console.log("Run Data:", runData); // Debugging statement

    setRun(runData);
    setStatus({ id: "0", status: "IN_QUEUE" });
  };

  useEffect(() => {
    // call generateImage when the component mounts
    // if base64Image and prompt is empty, redirect to home
    if (!base64Image || !prompt) {
      handleNextPage({ nextPage: "ChooseGender" });
    }

    generateImage({
      base64Image,
      positivePrompt: prompt,
      negativePrompt: negativePrompt,
      flowId: flowID,
      height: 1152,
      width: 768,
    });
  }, []);

  const { setUser } = useUser();

  useEffect(() => {
    if (status?.status === "COMPLETED") {
      payUserTokens(1, setUser);
    }
  }, [status]);

  useEffect(() => {
    const pollStatus = async () => {
      if (run) {
        let isCompleted =
          status?.status === "COMPLETED" || status?.status === "FAILED";
        while (!isCompleted) {
          const res = await fetch(`/api/status/${run.id}`);
          const statusData = await res.json();
          setStatus(statusData);
          if (["COMPLETED", "FAILED"].includes(statusData.status)) {
            isCompleted = true; // Update the completion status
          }
          await new Promise((resolve) => setTimeout(resolve, 1000));
          // Wait for 1 second before polling again
        }
      }
    };

    pollStatus();
  }, [run]);

  const hasCompleted = status && (status.status === "COMPLETED" || status.status === "FAILED");
  const generatedImage =
    status && status.status === "COMPLETED"
      ? status.output.images
      : "https://imgstreventstation.blob.core.windows.net/imgstrgoutput/Error_Message.png";

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement("a");
      link.href = generatedImage;
      // downcase and substitute spaces with _
      link.download =
        label?.toLowerCase().replace(" ", "_") || "generated-image.jpg";
      link.click();
    }
  };
  return (
    <>
      {hasCompleted ? (
        <div className="flex flex-col items-center justify-center">
          <ShowGeneratedImage
            label={label}
            handleDownload={handleDownload}
            generatedImage={generatedImage}
          />
        </div>
      ) : (
        <div
          className="flex flex-col justify-center items-center"
          style={{ height: "calc(100vh - 120px)" }}
        >
          <IsLoading />
          <ShowStatus status={status} />
        </div>
      )}
    </>
  );
};
