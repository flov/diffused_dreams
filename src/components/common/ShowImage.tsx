import React, { FC } from "react";
import { RWebShare } from "react-web-share";

import useWizardNavigation from "../wizard/useWizardNavigation";
import { Button, Image } from "@nextui-org/react";
import { ShareIcon } from "@/icons";

interface ShowImageProps {
  generatedImageUrl: string | undefined;
  handleDownload: () => void;
}

export const ShowImage: FC<ShowImageProps> = ({
  generatedImageUrl,
  handleDownload,
}) => {
  const { handleNextPage } = useWizardNavigation();
  if (!generatedImageUrl) return null;
  return (
    <>
      <Image
        src={generatedImageUrl}
        alt="Generated image"
        aria-label="Generated image"
      />
      <div className="mt-4 flex flex-col sm:flex-row gap-4">
        <Button size="lg" onClick={handleDownload}>
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
            size="lg"
            endContent={<ShareIcon width="20px" height="20px" color="#fff" />}
          >
            Share
          </Button>
        </RWebShare>
      </div>
      <div className="my-4 flex gap-4">
        <Button
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
