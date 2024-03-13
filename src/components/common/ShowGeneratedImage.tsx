import React, { FC } from "react";
import { RWebShare } from "react-web-share";

import useWizardNavigation from "../wizard/useWizardNavigation";
import { Button, Image } from "@nextui-org/react";
import { ShareIcon } from "@/icons";

interface ShowImageProps {
  generatedImageUrl: string | undefined;
  handleDownload: () => void;
}

export const ShowGeneratedImage: FC<ShowImageProps> = ({
  generatedImageUrl,
  handleDownload,
}) => {
  const { handleNextPage } = useWizardNavigation();
  if (!generatedImageUrl) return null;
  return (
    <>
      <Image
        style={{ maxHeight: "calc(100vh - 329px)" }}
        src={generatedImageUrl}
        alt="Generated image"
        aria-label="Generated image"
      />
      <div className="mt-4 flex flex-col sm:flex-row gap-4">
        <Button size="lg" onClick={handleDownload} color="primary">
          Download Image
        </Button>
        <RWebShare
          data={{
            text: "My new badass AI character",
            url: generatedImageUrl,
          }}
          onClick={() => console.log("shared successfully!")}
        >
          <Button
            color="primary"
            size="lg"
            endContent={<ShareIcon width="20px" height="20px" color="#fff" />}
          >
            Share
          </Button>
        </RWebShare>
      </div>
      <div className="mt-4 flex gap-4">
        <Button
          color="primary"
          size="lg"
          variant="bordered"
          onClick={() => handleNextPage({ nextPage: "ChooseGender" })}
        >
          Exit
        </Button>
      </div>
    </>
  );
};
