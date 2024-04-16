export type GenerateImagePayload = {
  base64Image: string;
  positivePrompt: string;
  negativePrompt: string;
  flowId: number;
  height: number;
  width: number;
};
