import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useRef,
} from "react";
import useWizardNavigation from "../useWizardNavigation";
import { Button, Image } from "@nextui-org/react";
import { BackButton } from "../../common/BackButton";
import { CardButton } from "@/components/common/CardButton";
import { UploadIcon } from "@/icons";

interface UploadProps {
  setBase64Image: Dispatch<SetStateAction<string>>;
  base64Image: string | undefined;
}

export const SelectFile: FC<UploadProps> = ({
  base64Image,
  setBase64Image,
}) => {
  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (reader.result) setBase64Image(reader.result as string);
      };
    }
  };

  const handleUploadImageClick = () => {
    fileInputRef?.current?.click();
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <BackButton page="SelectCameraOrFile" />
      <div
        style={{ height: "60vh" }}
        className="flex justify-center flex-col items-center w-full flex-wrap md:flex-nowrap gap-4"
      >
        {base64Image ? (
          <ShowImage
            base64Image={base64Image}
            setBase64Image={setBase64Image}
          />
        ) : (
          <>
            <h2 className="mb-4">Select a file</h2>
            <CardButton
              icon={UploadIcon}
              text="Upload a photo"
              onPress={() => handleUploadImageClick()}
            />
          </>
        )}
        <input
          type="file"
          className="hidden"
          onChange={handleFileInputChange}
          ref={fileInputRef}
        />
      </div>
    </>
  );
};

const ShowImage: FC<{
  base64Image: string;
  setBase64Image: Dispatch<SetStateAction<string>>;
}> = ({ base64Image, setBase64Image }) => {
  const { handleNextPage } = useWizardNavigation();
  return (
    <div style={{ height: "60vh" }}>
      <Image
        style={{ maxHeight: "calc(100vh -220px)" }}
        src={base64Image}
        alt="Uploaded image"
      />
      <div className="flex justify-center gap-4 mt-4">
        <Button
          color="success"
          onClick={() => handleNextPage({ nextPage: "SelectGender" })}
        >
          Confirm
        </Button>
        <Button color="danger" onClick={() => setBase64Image("")}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
