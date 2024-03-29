import { Image } from "@nextui-org/react";
import { GeneratedImage } from "@prisma/client";
import React from "react";

interface PostListProps {
  fetchData: () => Promise<GeneratedImage[]>;
}

export default async function ListImages({ fetchData }: PostListProps) {
  const images = await fetchData();

  const renderedImages = images.map((image, idx) => {
    return (
      <div key={`id${idx}`}>
        <a href={image.imageUrl} target="_blank" rel="noreferrer">
          <Image className="border" src={image.imageUrl} alt={image.imageUrl} />
        </a>
      </div>
    );
  });

  // make a grid in tailwind that contains maximum 4 images in a row and a max width of 4xl and center the grid

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
      {renderedImages}
    </div>
  );
}
