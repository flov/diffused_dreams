import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useRef,
} from "react";
import useWizardNavigation from "../useWizardNavigation";
import { Button, Image } from "@nextui-org/react";

interface UploadProps {
  setBase64Image: Dispatch<SetStateAction<string>>;
  base64Image: string | undefined;
}

export const SelectFile: FC<UploadProps> = ({
  base64Image,
  setBase64Image,
}) => {
  const { handleNextPage } = useWizardNavigation();

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
    <div className="flex flex-col items-center w-full flex-wrap md:flex-nowrap gap-4">
      {base64Image ? (
        <>
          <Image src={base64Image} width={600} alt="Uploaded image" />
          <div className="flex gap-4">
            <Button
              color="success"
              onClick={() => handleNextPage("SelectGender")}
            >
              Confirm
            </Button>
            <Button color="danger" onClick={() => setBase64Image("")}>
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <>
          <h1>Select a file</h1>
          <Button color="primary" onClick={handleUploadImageClick}>
            Select file
          </Button>
        </>
      )}
      <input
        type="file"
        className="hidden"
        onChange={handleFileInputChange}
        ref={fileInputRef}
      />
    </div>
  );
};
