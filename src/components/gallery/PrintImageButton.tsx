"use client";

import { Button, ButtonProps, Tooltip } from "@nextui-org/react";
import printJS from "print-js";

interface PrintImageButtonProps extends ButtonProps {
  imageUrl: string;
  withTooltip?: boolean;
  tooltipContent?: string;
}

function PrintButton({
  imageUrl,
  children,
  ...rest
}: Omit<PrintImageButtonProps, "withTooltip" | "tooltipContent">) {
  return (
    <Button
      {...rest}
      onClick={() => {
        if (window && typeof window !== "undefined") {
          printJS({
            printable: imageUrl,
            type: "image",
            style: "img {max-width: 100%;}",
          });
        }
      }}
    >
      {children}
    </Button>
  );
}

export default function PrintImageButton({
  imageUrl,
  withTooltip,
  children,
  tooltipContent,
  ...rest
}: PrintImageButtonProps) {
  return withTooltip ? (
    <Tooltip content={tooltipContent || "Print image"} closeDelay={0}>
      <PrintButton imageUrl={imageUrl} {...rest}>
        {children}
      </PrintButton>
    </Tooltip>
  ) : (
    <PrintButton imageUrl={imageUrl} {...rest}>
      {children}
    </PrintButton>
  );
}
