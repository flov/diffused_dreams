"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { FC } from "react";

const ThemedLogo: FC = () => {
  const { resolvedTheme } = useTheme();
  if (resolvedTheme === "event-station") {
    return (
      <Image
        alt="logo"
        src="/event-station-logo.svg"
        width={367}
        height={144}
      />
    );
  } else {
    return (
      <Image alt="logo" src={"/alienware-logo.png"} width={400} height={200} />
    );
  }
};

export default ThemedLogo;
