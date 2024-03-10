import { FC } from "react";
import { CircularProgress } from "@nextui-org/react";

export const IsLoading: FC = () => {
  return (
    <CircularProgress
      aria-label="loading"
      color="primary"
      classNames={{
        svg: "w-36 h-36 drop-shadow-md",
        value: "text-3xl font-semibold text-white",
      }}
    />
  );
};
