import { NextRequest } from "next/server";
import { fetchImagesByUserId } from "@/db/queries/generatedImages";
import { createReadStream, createWriteStream } from "fs";
import { join } from "path";
import { promisify } from "util";
import JSZip from "jszip";
import { uploadZipToAzureBlobService } from "@/db/utils/uploadZipToAzureBlobService";
import deleteFile from "@/db/utils/deleteFile";
import fs from "fs";

// Define the structure of the expected response if you know it.
// For example, if your images are returned as an array of objects with certain properties:
interface Image {
  id: number;
  url: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
const { userId } = params;
console.log('Fetching images for userId:', userId);
if (typeof userId !== 'string') {
    return new Response(
    JSON.stringify({ error: "UserID has to be of type STRING" }),
    {
      status: 401,
      headers: { "Content-Type": "application/json" },
    },
  );
}

try {
    // ...

    try {
      console.log('Fetching images for userId:', userId);
      const images = await fetchImagesByUserId(userId);
      console.log('Images fetched:', images);

      // Create a new instance of JSZip
      const zip = new JSZip();

      // Generate the zip file
      for (const image of images) {
        const imageBlob = await fetch(image.imageUrl).then((res) => res.blob());
        zip.file(image.label || "generated-image.jpg", imageBlob);
      }
      
      // write zip file to the path
      const zipFilePath = join(__dirname, '../../../priv/zip/images.zip');
      const zipFile = await zip.generateAsync({ type: 'nodebuffer' });
      fs.writeFileSync(zipFilePath, zipFile);

      // Upload the zip file to Azure Blob Storage
      const url = await uploadZipToAzureBlobService(zipFilePath);
      // Delete the zip file from the path
      await deleteFile(zipFilePath);

      return new Response(JSON.stringify({ url }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch images" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
} catch (error) {
  return new Response(
    JSON.stringify({ error: "Failed to fetch images" }),
    {
      status: 500,
      headers: { "Content-Type": "application/json" },
    },
  );
}}