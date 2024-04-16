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
import Compressor from "compressorjs";

interface UploadProps {
  setBase64Image: Dispatch<SetStateAction<string>>;
  base64Image: string | undefined;
  workflow: string;
}

export const SelectFile: FC<UploadProps> = ({
  base64Image,
  setBase64Image,
  workflow
}) => {
  // const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (!event.target.files) return;
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //         if (reader.result) {
  //           if (file.size > 3 * 1024 * 1024) {
  //             new ImageCompressor(file, {
  //               quality: .8, // Compression quality
  //               success(result) {
  //                 setBase64Image(result as unknown as string);
  //               },
  //               error(e) {
  //                 console.log(e.message);
  //               },
  //             });
  //           } else {
  //           setBase64Image(reader.result as string);
  //         }
  //       };
  //   }
  // }};

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    console.log("file input change")
    const file = event.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        // Directly compress the file without converting it to a data URL first
        new Compressor(file, {
          quality: 0.7, // Compression quality
          convertSize: 0,
          success(compressedResult) {
            // Convert compressed file to Base64
            const reader = new FileReader();
            reader.readAsDataURL(compressedResult);
            reader.onloadend = () => {
              setBase64Image(reader.result as string);
            };
          },
          error(e) {
            console.log(e.message);
          },
        });
      } else {
        // Convert to Base64 directly for files under the size limit
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setBase64Image(reader.result as string);
        };
      }
    }
  };

  const handleUploadImageClick = () => {
    fileInputRef?.current?.click();
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <BackButton page="SelectCameraOrFile" />
      <div className="flex justify-center flex-col items-center w-full flex-wrap md:flex-nowrap gap-4">
        {base64Image ? (
          <ShowImage
            base64Image={base64Image}
            setBase64Image={setBase64Image}
            workflow={workflow}
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
  workflow ?: string;
}> = ({ base64Image, setBase64Image, workflow }) => {
  const { handleNextPage } = useWizardNavigation();
  return (
    <div style={{ height: "60vh" }}>
      <Image
        style={{ maxHeight: "calc(100vh - 160px)" }}
        src={base64Image}
        alt="Uploaded image"
      />
      <div className="flex justify-center gap-4 mt-4">
        <Button
          color="success"
          onClick={() => handleNextPage({ nextPage: workflow === "two persons" ? "ChooseCampaign" : "SelectGender" })}
        >
          Confirm
        </Button>
        <Button color="danger" onClick={() => setBase64Image("")}>
          Remove Upload
        </Button>
      </div>
    </div>
  );
};
