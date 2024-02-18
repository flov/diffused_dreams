import { STATUS, StatusResponse } from "@/types";
import { FC } from "react";
import { Chip } from "@nextui-org/react";

type ShowStatusProps = {
  status: StatusResponse | undefined;
};

const getColor = (status: string) => {
  if (status === "IN_QUEUE") {
    return "primary";
  } else if (status === "IN_PROGRESS") {
    return "secondary";
  } else if (status === "COMPLETED") {
    return "success";
  } else if (status === "FAILED") {
    return "danger";
  } else {
    return "default";
  }
};

const ExecutionTime = ({ status }: { status: StatusResponse }) => {
  if (status.status !== "COMPLETED") return null;
  return <h4>Finished in {Math.floor(status.executionTime / 100) / 10}s</h4>;
};

const ShowStatus: FC<ShowStatusProps> = ({ status }) => {
  if (!status) return null;

  return (
    <>
      <div className="flex gap-4 py-4 items-center">
        <Chip color={getColor(status.status)}>{status.status}</Chip>
        <ExecutionTime status={status} />
      </div>
    </>
  );
};

export default ShowStatus;
