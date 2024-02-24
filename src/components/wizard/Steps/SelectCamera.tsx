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

interface Device {
  deviceId: string;
  kind: string;
  label: string;
}

export const SelectCamera: FC<CameraProps> = ({ setBase64Image }) => {
  const webcamRef = useRef<Webcam>(null);

  const [deviceId, setDeviceId] = useState({});
  const [devices, setDevices] = useState<Device[]>([]);

  const handleDevices = useCallback(
    (mediaDevices: Device[]) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices],
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
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

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <div className="flex justify-center">
        <h1 className="md:text-7xl text-4xl">Take a photo</h1>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4">
        <Select
          variant="bordered"
          className="max-w"
          items={devices}
          label="Camera"
          onChange={({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
            setDeviceId(value);
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
          videoConstraints={{ deviceId: deviceId }}
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
