export interface GenerateImageApiResponse {
  delayTime: number;
  executionTime: number;
  id: string;
  output: {
    message: string;
    status: string;
  };
  status: string;
}
