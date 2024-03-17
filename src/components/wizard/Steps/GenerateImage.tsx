import React, { FC, useEffect, useState } from "react";

import { RunResponse, StatusResponse } from "@/types";
import { GenerateImagePayload } from "@/types/api/generate-image";
import useWizardNavigation from "../useWizardNavigation";
import { BackButton } from "../../common/BackButton";
import { IsLoading } from "@/components/common/IsLoading";
import { ShowGeneratedImage } from "../../common/ShowGeneratedImage";
import { ShowStatus } from "@/components/common/ShowStatus";
import { useUser } from "@/providers/userProvider";
import { payUserTokens } from "@/db/queries/user";

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
      handleNextPage({ nextPage: "ChooseGender" });
    }

    generateImage({
      base64Image,
      positivePrompt: prompt,
      negativePrompt: "nsfw",
      flowId: 5,
    });
  }, []);

  const { setUser } = useUser();

  useEffect(() => {
    if (status?.status === "COMPLETED") {
      payUserTokens(50, setUser);
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

  const hasCompleted = status && status.status === "COMPLETED";
  const generatedImageUrl =
    status && status.status === "COMPLETED"
      ? "data:image/jpeg;base64," + status.output.images
      : undefined;

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
      {window.location.href.includes("alienware") ? (
        <BackButton page="SelectCampaign" />
      ) : (
        <BackButton page="CaptureWithCamera" />
      )}
      {hasCompleted ? (
        <div className="flex flex-col items-center justify-center">
          <ShowGeneratedImage
            handleDownload={handleDownload}
            generatedImageUrl={generatedImageUrl}
          />
          {/* <ShowStatus status={status} /> */}
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
