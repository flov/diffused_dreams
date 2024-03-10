import { Avatar, Button } from "@nextui-org/react";
import React, {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import Webcam from "react-webcam";
import { SelectCameraDevice } from "./SelectCameraDevice";

interface CapturePhotoFormProps {
  selectedDevice?: string;
  setBase64Image: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
  alreadySelectedCamera?: boolean;
}

export const CapturePhotoForm: FC<CapturePhotoFormProps> = ({
  onSubmit,
  setBase64Image,
  alreadySelectedCamera = false,
  selectedDevice: prevSelectedDevice,
}) => {
  const [selectedDevice, setSelectedDevice] = useState(
    prevSelectedDevice || "",
  );
  const [countdown, setCountdown] = useState<number>();
  const webcamRef = useRef<Webcam>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCountdown(3);
    const makeScreenshot = () => {
      const screenshot = webcamRef.current?.getScreenshot();

      if (screenshot) {
        setBase64Image(screenshot);
        onSubmit();
      }
    };

    const countdownFunction = (count: number) => {
      if (count === 0) {
        // If countdown reaches 0, execute handleSubmit logic
        makeScreenshot();
      } else {
        // Update countdown and execute setTimeout recursively
        setTimeout(() => {
          setCountdown(count - 1);
          countdownFunction(count - 1);
        }, 1000); // Wait for 1 second
      }
    };

    countdownFunction(3); // start the 3 second countdown
  };

  return (
    <form
      className="flex flex-col items-center justify-center gap-4"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-center">
        <h1 className="md:text-6xl text-5xl text-white sm:mb-4">
          Take a photo
        </h1>
      </div>

      {!alreadySelectedCamera && (
        <div className="flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4">
          <SelectCameraDevice
            selectedDevice={selectedDevice}
            setSelectedDevice={setSelectedDevice}
          />
        </div>
      )}

      <div className="flex justify-center">
        <Webcam
          audio={false}
          ref={webcamRef}
          mirrored
          screenshotFormat="image/jpeg"
          videoConstraints={{ deviceId: selectedDevice }}
          width={640}
          height={480}
        />
      </div>

      <div className="flex justify-center">
        {countdown !== undefined ? (
          <Avatar
            color="primary"
            name={countdown.toString()}
            className="w-16 h-16 text-large"
          />
        ) : (
          <Button color="primary" type="submit" size="lg" className="mb-4">
            Capture
          </Button>
        )}
      </div>
    </form>
  );
};
