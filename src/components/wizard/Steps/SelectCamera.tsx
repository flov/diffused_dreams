"use client";

import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Webcam from "react-webcam";

import { Button, Select, SelectItem } from "@nextui-org/react";
import useWizardNavigation from "../useWizardNavigation";
import { BackButton } from "./BackButton";

interface CameraProps {
  setBase64Image: Dispatch<SetStateAction<string>>;
}

export const SelectCamera: FC<CameraProps> = ({ setBase64Image }) => {
  const webcamRef = useRef<Webcam>(null);

  const [selectedDevice, setSelectedDevice] = useState("");
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  const handleDevices = useCallback(
    (mediaDevices: MediaDeviceInfo[]) => {
      const videoDevices = mediaDevices.filter(
        (device) => device.kind === "videoinput",
      );
      setDevices(videoDevices);
      setSelectedDevice(videoDevices[0]?.deviceId || "");
    },
    [setDevices],
  );

  useEffect(() => {
    const enumerateDevices = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
          await navigator.mediaDevices.enumerateDevices().then(handleDevices);
        }
      } catch (error) {
        console.error("Error enumerating devices:", error);
      }
    };

    enumerateDevices();
  }, [handleDevices]);

  const { handleNextPage } = useWizardNavigation();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) {
      setBase64Image(screenshot);
      handleNextPage("SelectGender");
    }
  };

  console.log({ selectedDevice, devices });

  return (
    <form
      className="flex flex-col h-2/3 items-center justify-center gap-4"
      onSubmit={onSubmit}
    >
      <div className="flex justify-center">
        <h1 className="md:text-6xl text-5xl sm:mb-4">Take a photo</h1>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4">
        <Select
          variant="bordered"
          className="max-w"
          items={devices}
          label="Camera"
          key={selectedDevice}
          defaultSelectedKeys={[selectedDevice]}
          onChange={({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
            setSelectedDevice(value);
          }}
          placeholder="Select your camera"
        >
          {devices.map((device) => (
            <SelectItem key={device.deviceId}>{device.label}</SelectItem>
          ))}
        </Select>
      </div>

      <div className="flex justify-center">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ deviceId: selectedDevice }}
          width={640}
          height={480}
        />
      </div>

      <div className="flex justify-center">
        <Button color="primary" type="submit" size="lg" className="mb-8">
          Capture
        </Button>
      </div>
      <BackButton nextPage="SelectCameraOrFile" />
    </form>
  );
};
