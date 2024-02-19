import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  const url = `https://api.runpod.ai/v2/wxgerymesqt634/status/${id}`;

  const headers = {
    Authorization: `Bearer ${process.env.EVENTSTATION_RUNPOD_APIKEY}`,
    "Content-Type": "application/json",
  };
  console.log({ headers, url });
  const res = await fetch(url, { method: "GET", headers });
  const data = await res.json();

  return Response.json(data);
}
