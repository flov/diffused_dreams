export type STATUS = "IN_QUEUE" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
export type RunResponse = {
  id: string;
  status: STATUS;
};

export type StatusResponse = COMPLETED | IN_PROGRESS | IN_QUEUE | FAILED;

type COMPLETED = {
  delayTime: number;
  executionTime: number;
  id: string;
  output: Output;
  status: "COMPLETED";
};

type IN_PROGRESS = {
  delayTime: number;
  id: string;
  status: "IN_PROGRESS";
};

type IN_QUEUE = {
  id: string;
  status: "IN_QUEUE";
};

type FAILED = {
  id: string;
  status: "FAILED";
};

export type Output = {
  images: string;
};
