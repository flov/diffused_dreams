import React, { FC } from "react";
import { Avatar, Checkbox, Chip, cn } from "@nextui-org/react";

export const FilterCheckbox: FC<{ image: string; prompt: string }> = ({
  image,
  prompt,
}) => {
  return (
    <Checkbox
      aria-label={prompt}
      classNames={{
        base: cn(
          "inline-flex max-w-md w-full bg-content1 m-0",
          "hover:bg-content2 items-center justify-start",
          "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary",
        ),
        label: "w-full",
      }}
      value={prompt}
    >
      <div className="w-full flex justify-between gap-2">
        <Avatar src={image} className="w-20 h-20 text-large" />
        <div className="flex flex-col justify-center items-end gap-1">
          <span className="text-default-500">{prompt}</span>
        </div>
      </div>
    </Checkbox>
  );
};
