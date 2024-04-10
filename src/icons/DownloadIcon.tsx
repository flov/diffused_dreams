import React, { FC } from "react";

interface DownloadIconProps {
  width?: string;
  height?: string;
  color?: string;
}

export const DownloadIcon: FC<DownloadIconProps> = ({
  width = "24px",
  height = "24px",
  color = "#FFF",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={color}
        d="M11 16.5L4.125 9.625L6.05 7.63125L9.625 11.2062V0H12.375V11.2062L15.95 7.63125L17.875 9.625L11 16.5ZM2.75 22C1.99375 22 1.34658 21.731 0.8085 21.1929C0.270416 20.6548 0.000916667 20.0072 0 19.25V15.125H2.75V19.25H19.25V15.125H22V19.25C22 20.0062 21.731 20.6539 21.1929 21.1929C20.6548 21.7319 20.0072 22.0009 19.25 22H2.75Z"
      />
    </svg>
  );
};