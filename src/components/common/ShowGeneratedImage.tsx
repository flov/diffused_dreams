import React, { FC } from "react";
import { RWebShare } from "react-web-share";

import useWizardNavigation from "../wizard/useWizardNavigation";
import { Button, Image } from "@nextui-org/react";
import { ShareIcon } from "@/icons";
import DialogModal from "../common/Modal";

interface ShowImageProps {
  generatedImage: string | undefined;
  handleDownload: () => void;
  label: string;
  //generatedImageURL: string;
}

export const ShowGeneratedImage: FC<ShowImageProps> = ({
  generatedImage,
  handleDownload,
  label,
  //generatedImageURL,
}) => {
  const { handleNextPage } = useWizardNavigation();
  if (!generatedImage) return null;

  function handleOpenModal(): void {
    // Open the modal here
  }

  const modalBodyContent = (
    <p>
      test
    </p>
  );  

  return (
    <>
      <Image
        style={{ maxHeight: "calc(100vh - 210px)" }}
        src={generatedImage}
        alt={label || "Generated image"}
        aria-label="Generated image"
      />
      <div className="mt-4 flex flex-col sm:flex-row gap-4">
        <Button size="md" onClick={handleDownload} color="primary">
          Download Image
        </Button>
        <DialogModal
            title="Download with QR Code"
            buttonTitle="Download with QR Code"
            body={modalBodyContent}
            onCloseAction={() => console.log("closed")}
            //onPrimaryAction={() => console.log("shared successfully!")}
        />
        <RWebShare
          data={{
            text: "My new badass AI character",
            url: generatedImage,
          }}
          onClick={() => console.log("shared successfully!")}
        >
          <Button
            color="primary"
            size="md"
            endContent={<ShareIcon width="20px" height="20px" color="#fff" />}
          >
            Share
          </Button>

        </RWebShare>
      </div>
      <div className="mt-4 flex gap-4">
        <Button
          color="primary"
          size="md"
          variant="bordered"
          onClick={() => handleNextPage({ nextPage: "PrivacyPolicy" })}
        >
          Restart Photobooth
        </Button>
      </div>
    </>
  );
};
