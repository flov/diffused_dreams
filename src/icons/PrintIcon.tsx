import React, { FC } from "react";

interface PrintIconProps {
  width?: string;
  height?: string;
  color?: string;
}

export const PrintIcon: FC<PrintIconProps> = ({
  width = "24px",
  height = "24px",
  color = "#FFF",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={color}
        d="M19.2 4.88889H4.8V0H19.2V4.88889ZM19.2 11.6111C19.54 11.6111 19.8252 11.4938 20.0556 11.2591C20.286 11.0244 20.4008 10.7344 20.4 10.3889C20.4 10.0426 20.2848 9.75252 20.0544 9.51867C19.824 9.28481 19.5392 9.16748 19.2 9.16667C18.86 9.16667 18.5752 9.284 18.3456 9.51867C18.116 9.75333 18.0008 10.0434 18 10.3889C18 10.7352 18.1152 11.0257 18.3456 11.2603C18.576 11.495 18.8608 11.6119 19.2 11.6111ZM16.8 19.5556V14.6667H7.2V19.5556H16.8ZM19.2 22H4.8V17.1111H0V9.77778C0 8.73889 0.35 7.86826 1.05 7.16589C1.75 6.46352 2.6 6.11193 3.6 6.11111H20.4C21.42 6.11111 22.2752 6.4627 22.9656 7.16589C23.656 7.86907 24.0008 8.7397 24 9.77778V17.1111H19.2V22Z"
      />
    </svg>
  );
};
