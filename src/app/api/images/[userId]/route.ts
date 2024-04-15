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
      // for (const image of images) {
      //   console.log('Fetching image:', image);
      //   const imageBlob = await fetch(image.imageUrl).then((res) => res.blob());
      //   console.log('Image fetched:', imageBlob);
      //   console.log("append image to zip file")
      //   zip.file(image.label || "generated-image.jpg", imageBlob);
      // }
      
      // // write zip file to the path
      // const zipFilePath = join(__dirname, '../../../priv/zip/images.zip');
      // const zipFile = await zip.generateAsync({ type: 'nodebuffer' });
      // fs.writeFileSync(zipFilePath, zipFile);

      for (const image of images) {
        console.log('Fetching image:', image);
        const response = await fetch(image.imageUrl);
        if (!response.ok) throw new Error('Failed to fetch image: ' + image.imageUrl);
        const imageArrayBuffer = await response.arrayBuffer();
        console.log('Image fetched and converted to ArrayBuffer:', imageArrayBuffer);

        console.log("Appending image to zip file");
        // Append image to zip, you may want to extract the filename from imageUrl or use a generic name
        const filename = image.imageUrl.split('/').pop() ?? 'image.jpg'; // Extract filename from URL or use a default name
        zip.file(filename, imageArrayBuffer, { binary: true });
      }
      console.log('All images have been appended to the zip file');
      // Generate the zip file as nodebuffer to save it to filesystem
      const zipFile = await zip.generateAsync({ type: 'nodebuffer' });
      console.log('Zip file has been generated');
      // Define the path where the zip file will be saved
      const zipFilePath = join(__dirname, '../../../../../../priv/zip/images.zip');
      console.log('Zip file will be saved to:', zipFilePath);
      
      // Write zip file to the path
      fs.writeFileSync(zipFilePath, zipFile);
      console.log('Zip file has been saved to:', zipFilePath);

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