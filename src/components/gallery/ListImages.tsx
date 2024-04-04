import { Image } from "@nextui-org/react";
import { GeneratedImage } from "@prisma/client";
import React from "react";
import GalleryImage from "./GalleryImage";

interface PostListProps {
  fetchData: () => Promise<GeneratedImage[]>;
}

export default async function ListImages({ fetchData }: PostListProps) {
  const images = await fetchData();

  const renderedImages = images.map((image, idx) => {
    return <GalleryImage image={image} imageIdx={idx} key={`id-${idx}`} />;
  });

  // make a grid in tailwind that contains maximum 4 images in a row and a max width of 4xl and center the grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-6 gap-x-4 max-w-5xl mx-auto">
      {renderedImages}
    </div>
  );
}
