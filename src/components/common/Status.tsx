import { STATUS, StatusResponse } from "@/types";
import { Chip } from "@nextui-org/react";

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

export default function Status(status: StatusResponse | undefined) {
  if (!status) return null;

  return <Chip color={getColor(status.status)}>{status.status}</Chip>;
}
