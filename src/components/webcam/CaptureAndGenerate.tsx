"use client";

import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Webcam from "react-webcam";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { GenerateImagePayload } from "@/types/api/generate-image";
import { RunResponse, StatusResponse } from "@/types";
import { flows } from "./data";
import { ShowStatus } from "../common/ShowStatus";

const CaptureAndGenerate: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [run, setRun] = useState<RunResponse>();
  const [status, setStatus] = useState<StatusResponse>();
  const [positivePrompt, setPositivePrompt] = useState(
    "A full body portrait of a male man mysterious figure cloaked in starlit robes, wielding an hourglass that controls the flow of time, surrounded by clocks, looking at viewer, photography, detailed skin, detailed texture, realistic, photo-realistic, 8k, highly detailed, full length frame, High detail RAW color art, diffused soft lighting, shallow depth of field, sharp focus, hyperrealism, cinematic lighting",
  );
  const [negativePrompt, setNegativePrompt] = useState("nsfw");
  const [flowId, setFlowId] = useState<number>(5);
  const [base64Image, setBase64Image] = useState<string | ArrayBuffer>();
  const [showWebcam, setShowWebcam] = useState(false);

  const handleUseWebcam = () => {
    setShowWebcam(true);
    setBase64Image(undefined);
  };

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

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) {
      // remove the data:image/jpeg;base64, prefix
      const base64Image = screenshot.split(",")[1];
      generateImage({ base64Image, positivePrompt, negativePrompt, flowId });
    }
  };

  // file upload for image
  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader.result) setBase64Image(reader.result);
      };
    }
  };

  const handleUploadImageClick = () => {
    fileInputRef?.current?.click();
    setShowWebcam(false);
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
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4">
          <Input
            color="primary"
            required={true}
            size="md"
            type="text"
            label="Positive prompt"
            placeholder="Imagine..."
            onChange={({
              target: { value },
            }: ChangeEvent<HTMLInputElement>) => {
              setPositivePrompt(value);
            }}
            value={positivePrompt}
          />
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4">
          <Input
            color="primary"
            label="Negative prompt"
            onChange={({
              target: { value },
            }: ChangeEvent<HTMLInputElement>) => {
              setNegativePrompt(value);
            }}
            placeholder="Imagine..."
            required={true}
            size="md"
            type="text"
            value={negativePrompt}
          />
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4">
          <Select
            className="max-w"
            color="primary"
            defaultSelectedKeys={flows[0].value}
            items={flows}
            label="Flow"
            onChange={({
              target: { value },
            }: ChangeEvent<HTMLSelectElement>) => {
              setFlowId(Number(value));
            }}
            placeholder="Select a flow"
          >
            {flows.map((flow) => (
              <SelectItem key={flow.value}>{flow.label}</SelectItem>
            ))}
          </Select>
        </div>

        <div className="flex justify-around w-full flex-wrap md:flex-nowrap gap-4">
          <Button color="primary" onClick={handleUploadImageClick}>
            Upload image
          </Button>
          <input
            type="file"
            className="hidden"
            onChange={handleFileInputChange}
            ref={fileInputRef}
          />
          <Button color="primary" onClick={handleUseWebcam}>
            Use Webcam
          </Button>
        </div>

        {base64Image && (
          <div className="flex justify-center">
            <img src={base64Image as string} />
          </div>
        )}
        {showWebcam && (
          <div className="flex justify-center">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={640}
              height={480}
            />
          </div>
        )}

        <div className="flex justify-center">
          {status?.status === "COMPLETED" && (
            <img alt="generated image" src={status.output.images} />
          )}
        </div>
        <Button
          isLoading={status && status.status !== "COMPLETED"}
          color="primary"
          type="submit"
          size="lg"
          className="mb-8"
        >
          Go
        </Button>
      </form>

      <ShowStatus status={status} />
    </div>
  );
};

export default CaptureAndGenerate;
