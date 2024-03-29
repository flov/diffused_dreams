import { auth } from "@/auth";
import { db } from "@/db";
import { GenerateImagePayload } from "@/types/api/generate-image";

export const maxDuration = 10; // This function can run for a maximum of 10 seconds
export const dynamic = "force-dynamic";

interface RunpodResponse {
  id: string;
  status: string;
}

export async function POST(request: Request) {
  const runpodEndpoint = `https://api.runpod.ai/v2/${process.env.EVENTSTATION_RUNPOD_SINGLE_PERSON_ENDPOINT_ID}/run`;

  const headers = {
    Authorization: `Bearer ${process.env.EVENTSTATION_RUNPOD_APIKEY}`,
    "Content-Type": "application/json",
  };

  try {
    const { base64Image, positivePrompt, negativePrompt, flowId } =
      (await request.json()) as GenerateImagePayload;

    const session = await auth();
    // if the user is not signed in, return an error
    if (!session || !session.user || !session.user.email)
      return new Response(
        JSON.stringify({ error: "You must be signed in to do this" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      );
    // fetch the user's tokens from the database and check if the user has enough tokens
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user)
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });

    const body = {
      input: {
        img: base64Image,
        positive_prompt: positivePrompt,
        negative_prompt: negativePrompt,
        flow_id: flowId,
      },
    };

    const res = await fetch(runpodEndpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const data: RunpodResponse = await res.json();

    // create a new job for the user in the database
    await db.job.create({
      data: {
        id: data.id,
        userId: user.id,
      },
    });

    return Response.json(data, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
