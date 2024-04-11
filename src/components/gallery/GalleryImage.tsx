import { DownloadIcon } from "@/icons/DownloadIcon";
import { Button, Image, Tooltip } from "@nextui-org/react";
import { GeneratedImage } from "@prisma/client";
import React from "react";
import PrintImageButton from "./PrintImageButton";
import { PrintIcon } from "@/icons/PrintIcon";

type GalleryImageProps = {
  image: GeneratedImage;
  imageIdx: number;
};

export default function GalleryImage(props: GalleryImageProps) {
  const { image, imageIdx } = props;

  return (
    <div className="flex flex-col items-center gap-y-1">
      <p className="text-sm ">{`Image name + ${imageIdx + 1}`}</p>
      <a href={image.imageUrl} target="_blank" rel="noreferrer">
        <Image
          src={image.imageUrl}
          className="rounded-none"
          alt={image.imageUrl}
        />
      </a>
      <div className="flex align-center justify-center gap-x-3">
        <PrintImageButton
          withTooltip
          tooltipContent={"Print image"}
          imageUrl={image.imageUrl}
          className="border-secondary rounded py-1 px-3"
          variant="bordered"
        >
          <PrintIcon />
        </PrintImageButton>
        <Tooltip content="Download image" closeDelay={0}>
          <Button
            variant="bordered"
            className="border-secondary rounded py-1 px-3 "
          >
            <DownloadIcon />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
