"use client";

import { RunResponse, StatusResponse } from "@/types";
import { dataURLtoFile } from "@/utils";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import ShowStatus from "../images/ShowStatus";
import { flows } from "./data";
import { GenerateImagePayload } from "@/types/api/generate-image";

const CaptureAndUpload: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [run, setRun] = useState<RunResponse>();
  const [status, setStatus] = useState<StatusResponse>();
  const [positivePrompt, setPositivePrompt] = useState(
    "A full body portrait of a male man mysterious figure cloaked in starlit robes, wielding an hourglass that controls the flow of time, surrounded by clocks, looking at viewer, photography, detailed skin, detailed texture, realistic, photo-realistic, 8k, highly detailed, full length frame, High detail RAW color art, diffused soft lighting, shallow depth of field, sharp focus, hyperrealism, cinematic lighting",
  );
  const [negativePrompt, setNegativePrompt] = useState("nsfw");
  const [flowId, setFlowId] = useState<number>(5);
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const generateImage = async (payload: GenerateImagePayload) => {
    const body = JSON.stringify(payload);
    const res = await fetch("/api/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    const runData = (await res.json()) as RunResponse;

    setRun(runData);
    setStatus(undefined);
  };

  const capture = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) {
      setScreenshot(screenshot);
      // remove the data:image/jpeg;base64, prefix
      const base64Image = screenshot.split(",")[1];
      generateImage({ base64Image, positivePrompt, negativePrompt, flowId });
    }
  };

  useEffect(() => {
    const pollStatus = async () => {
      if (run) {
        let currentStatus = status;
        while (
          currentStatus?.status !== "COMPLETED" &&
          currentStatus?.status !== "FAILED"
        ) {
          const res = await fetch(`/api/status/${run.id}`);
          const statusData = await res.json();
          currentStatus = statusData;
          setStatus(statusData);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          // Wait for 1 second before polling again
        }
      }
    };

    pollStatus();
  }, [run]);

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={capture}>
        <div className="flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4">
          <Input
            required={true}
            size="md"
            type="text"
            label="Positive prompt"
            placeholder="Imagine..."
            onChange={({ target: { value } }) => {
              setPositivePrompt(value);
            }}
            value={positivePrompt}
          />
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4">
          <Input
            required={true}
            size="md"
            type="text"
            label="Negative prompt"
            placeholder="Imagine..."
            onChange={({ target: { value } }) => {
              setNegativePrompt(value);
            }}
            value={negativePrompt}
          />
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4">
          <Select
            items={flows}
            label="Flow"
            placeholder="Select a flow"
            className="max-w"
            defaultSelectedKeys={flows[0].value}
            onChange={(flow) => {
              setFlowId(Number(flow));
            }}
          >
            {(flow) => <SelectItem key={flow.value}>{flow.label}</SelectItem>}
          </Select>
        </div>

        <div className="flex justify-center">
          {status?.status === "COMPLETED" ? (
            <img src={status.output.images} />
          ) : (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={640}
              height={480}
            />
          )}
        </div>
        <Button
          isLoading={status && status.status !== "COMPLETED"}
          color="primary"
          type="submit"
          size="lg"
        >
          Go
        </Button>
      </form>

      <ShowStatus status={status} />
    </div>
  );
};

export default CaptureAndUpload;
