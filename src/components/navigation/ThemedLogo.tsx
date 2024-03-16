"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { FC } from "react";

interface ThemedLogoProps {
  width?: number;
  height?: number;
}

export const ThemedLogo: FC<ThemedLogoProps> = ({
  width = 290,
  height = 110,
}) => {
  const { resolvedTheme } = useTheme();
  if (resolvedTheme === "alienware") {
    return (
      <Image
        alt="logo"
        src={"/alienware-logo.png"}
        width={width}
        height={height}
      />
    );
  } else {
    return (
      <Image
        alt="logo"
        src="/event-station-logo.svg"
        width={width}
        height={height}
      />
    );
  }
};

export default ThemedLogo;
