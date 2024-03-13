import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Select, SelectItem, Skeleton } from "@nextui-org/react";

interface SelectCameraDeviceProps {
  selectedDevice: string;
  setSelectedDevice: Dispatch<SetStateAction<string>>;
}

export const SelectCameraDevice: FC<SelectCameraDeviceProps> = ({
  selectedDevice,
  setSelectedDevice,
}) => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  const handleDevices = useCallback(
    (mediaDevices: MediaDeviceInfo[]) => {
      const videoDevices = mediaDevices.filter(
        (device) => device.kind === "videoinput",
      );
      setDevices(videoDevices);
      setSelectedDevice(selectedDevice || videoDevices[0]?.deviceId || "");
    },
    [setDevices, setSelectedDevice],
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

  if (devices.length === 0) {
    return <Skeleton className="flex my-4 rounded w-full h-12" />;
  }

  return (
    <Select
      variant="bordered"
      color="primary"
      className="max-w my-4"
      items={devices}
      label="Camera"
      key={selectedDevice}
      defaultSelectedKeys={[
        selectedDevice ? selectedDevice : devices[0]?.deviceId,
      ]}
      onChange={({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
        setSelectedDevice(value);
      }}
      placeholder="Select your camera"
    >
      {devices.map((device) => (
        <SelectItem key={device.deviceId}>{device.label}</SelectItem>
      ))}
    </Select>
  );
};
