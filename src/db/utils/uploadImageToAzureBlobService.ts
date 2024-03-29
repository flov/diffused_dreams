import { BlobServiceClient } from "@azure/storage-blob";
import Jimp from "jimp";

export async function uploadImageToAzureBlobStorage(
  base64String: string,
): Promise<string> {
  try {
    // Azure Blob Storage connection string
    const connectionString = process.env.AZURE_BLOB_STORAGE_CONNECTION_STRING;
    if (!connectionString) {
      throw new Error(
        "You need to provide an Azure Blob Storage connection string, see .env file.",
      );
    }
    const containerName = "diffuseddreams"; // Name of your container

    // Create BlobServiceClient
    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Generate a unique name for the blob
    const blobName = `image_${Date.now()}.png`;
    const decodedData = atob(base64String);
    const buffer = Buffer.from(decodedData, "binary");

    // Validate buffer
    if (!buffer || buffer.length === 0) {
      throw new Error("Invalid or empty buffer.");
    }
    const image = await Jimp.read(buffer);
    image.quality(60);
    if (!image) throw new Error("Failed to read image.");

    // Convert the resized image to a buffer
    const resizedBuffer = await image.getBufferAsync(Jimp.MIME_PNG);

    // Upload data to the blob
    await containerClient.uploadBlockBlob(
      blobName,
      resizedBuffer,
      resizedBuffer.length,
    );

    const uploadedBlobUrl = `https://${blobServiceClient.accountName}.blob.core.windows.net/${containerName}/${blobName}`;
    console.log(`Uploaded image to Azure Blob Storage: ${uploadedBlobUrl}`);
    return uploadedBlobUrl; // Return the name of the uploaded blob
  } catch (error) {
    throw new Error("Failed to upload image to Azure Blob Storage");
  }
}
