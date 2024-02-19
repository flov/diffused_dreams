import { GenerateImagePayload } from "@/types/api/generate-image";

export const maxDuration = 10; // This function can run for a maximum of 10 seconds
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const url = `https://api.runpod.ai/v2/${process.env.EVENTSTATION_RUNPOD_SINGLE_PERSON_EDNPOINT_ID}/run`;

  const headers = {
    Authorization: `Bearer ${process.env.EVENTSTATION_RUNPOD_APIKEY}`,
    "Content-Type": "application/json",
  };

  const { base64Image, positivePrompt, negativePrompt, flowId } =
    (await request.json()) as GenerateImagePayload;

  const body = {
    input: {
      img: base64Image,
      positive_prompt: positivePrompt,
      negative_prompt: negativePrompt,
      flow_id: flowId,
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return Response.json(data);
}
