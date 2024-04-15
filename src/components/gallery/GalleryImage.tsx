"use client";

import { DownloadIcon } from "@/icons/DownloadIcon";
import { PrintIcon } from "@/icons/PrintIcon";
import { Button, Image, Tooltip } from "@nextui-org/react";
import { GeneratedImage } from "@prisma/client";
import React from "react";

type GalleryImageProps = {
  image: GeneratedImage;
  imageIdx: number;
};

export default function GalleryImage(props: GalleryImageProps) {
  const { image, imageIdx } = props;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image.imageUrl;
    // downcase and substitute spaces with _
    link.download =
      image.label?.toLowerCase().replace(" ", "_") || "generated-image.jpg";
    link.click();
  };

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
        <Tooltip content="Print image" closeDelay={0}>
          <Button
            variant="bordered"
            className="border-secondary rounded py-1 px-3"
          >
            <PrintIcon />
          </Button>
        </Tooltip>
        <Tooltip content="Download image" closeDelay={0}>
          <Button
            variant="bordered"
            className="border-secondary rounded py-1 px-3 "
            onClick={handleDownload}
          >
            <DownloadIcon />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
