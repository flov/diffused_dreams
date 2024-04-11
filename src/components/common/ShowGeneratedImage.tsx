import React, { FC } from "react";
import { RWebShare } from "react-web-share";

import useWizardNavigation from "../wizard/useWizardNavigation";
import { Button, Image, listboxSection } from "@nextui-org/react";
import { ShareIcon } from "@/icons";
import DialogModal from "../common/Modal";
import QRCodeComponent from "../common/QRCode";

interface ShowImageProps {
  generatedImage: string | undefined;
  handleDownload: () => void;
  label: string;
}

export const ShowGeneratedImage: FC<ShowImageProps> = ({
  generatedImage,
  handleDownload,
  label,
}) => {
  const { handleNextPage } = useWizardNavigation();
  if (!generatedImage) return null;

  const link = {
    href: generatedImage,
    title: label || "Generated image",
  };

  const modalBodyContent = (
      <QRCodeComponent value={generatedImage} />
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
        <div className="flex-grow"></div>
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
