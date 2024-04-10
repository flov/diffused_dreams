import React, { FC } from "react";

interface LockIconProps {
  width?: string;
  height?: string;
  color?: string; // Accepts any valid CSS color value
}

export const LockIcon: FC<LockIconProps> = ({
  width = "20px",
  height = "20px",
  color = "white",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.8333 10.1553H4.16667C3.24619 10.1553 2.5 10.9015 2.5 11.8219V17.6553C2.5 18.5757 3.24619 19.3219 4.16667 19.3219H15.8333C16.7538 19.3219 17.5 18.5757 17.5 17.6553V11.8219C17.5 10.9015 16.7538 10.1553 15.8333 10.1553Z"
        stroke={color}
      />
      <path
        d="M5.83301 10.1553V6.82194C5.83301 5.71687 6.27199 4.65706 7.0534 3.87566C7.8348 3.09426 8.89461 2.65527 9.99967 2.65527C11.1047 2.65527 12.1646 3.09426 12.946 3.87566C13.7274 4.65706 14.1663 5.71687 14.1663 6.82194V10.1553"
        stroke={color}
      />
    </svg>
  );
};
