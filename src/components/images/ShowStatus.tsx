import { STATUS, StatusResponse } from "@/types";
import { Chip } from "@nextui-org/react";
import { FC } from "react";

type ShowStatusProps = {
  status: StatusResponse | undefined;
};

const getColor = (status: STATUS) => {
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

      {status.status === "COMPLETED" && status.output.status === "success" && (
        <div className="flex items-center justify-center">
          <img src={status.output.message} />
        </div>
      )}
    </>
  );
};

export default ShowStatus;
