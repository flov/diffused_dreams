"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { FC } from "react";

const ThemedLogo: FC = () => {
  const { resolvedTheme } = useTheme();
  if (resolvedTheme === "alienware") {
    return (
      <Image alt="logo" src={"/alienware-logo.png"} width={290} height={110} />
    );
  } else {
    return (
      <Image
        alt="logo"
        src="/event-station-logo.svg"
        width={290}
        height={110}
      />
    );
  }
};

export default ThemedLogo;
