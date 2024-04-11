import { auth } from "@/auth";
import { db } from "@/db";
import { uploadImageToAzureBlobStorage } from "@/db/utils/uploadImageToAzureBlobService";
import { StatusResponse } from "@/types";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

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

  const url = `https://api.runpod.ai/v2/${process.env.EVENTSTATION_RUNPOD_SINGLE_PERSON_ENDPOINT_ID}/status/${id}`;

  const headers = {
    Authorization: `Bearer ${process.env.EVENTSTATION_RUNPOD_APIKEY}`,
    "Content-Type": "application/json",
  };
  const res = await fetch(url, { method: "GET", headers });
  const data: StatusResponse = await res.json();

  // if status is "COMPLETED", remove the job from the database
  // and create a new generated image in the database
  if (data.status === "COMPLETED") {
    // await db.job.delete({ where: { id } });
    // get the users id by querying the database with the user's email
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user)
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    const base64String = data.output.images;
    const uploadedBlobUrl = await uploadImageToAzureBlobStorage(base64String);
    // delete the job from the database after the image has been generated
    await db.job.delete({ where: { id } });
    // and create a new generated image in the db for the user
    await db.generatedImage.create({
      data: {
        label: "n/a",
        prompt: "n/a",
        imageUrl: uploadedBlobUrl,
        userId: user.id,
      },
    });
  }
  const uploadedBlobUrl = ""; // Declare the uploadedBlobUrl variable
  // return new Response(JSON.stringify({ data, uploadedBlobUrl }), {
  //   status: 200,
  //   headers: { "Content-Type": "application/json" },
  // });
  return Response.json(data); // Fix: Add 'new' keyword before 'Response'
}
