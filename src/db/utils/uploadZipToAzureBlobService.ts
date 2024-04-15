import { BlobServiceClient } from "@azure/storage-blob";
import { promises as fs } from "fs";

export async function uploadZipToAzureBlobService(
    zipFilePath: string
): Promise<string> {
    try {
        // Azure Blob Storage connection string
        const connectionString = process.env.AZURE_BLOB_STORAGE_CONNECTION_STRING;
        if (!connectionString) {
            throw new Error(
                "You need to provide an Azure Blob Storage connection string, see .env file."
            );
        }
        const containerName = "diffuseddreams"; // Name of your container

        // Create BlobServiceClient
        const blobServiceClient = BlobServiceClient.fromConnectionString(
            connectionString
        );
        const containerClient = blobServiceClient.getContainerClient(containerName);

        // Read the zip file
        const zipFileData = await fs.readFile(zipFilePath);

        // Generate a unique name for the blob
        const blobName = `zip_${Date.now()}.zip`;

        // Upload data to the blob
        try {
            // Upload data to the blob
            await containerClient.uploadBlockBlob(
                blobName,
                zipFileData,
                zipFileData.length
            );
            console.log("Zip file uploaded successfully.");
        } catch (error) {
            console.error("Failed to upload zip file to Azure Blob Storage:", error);
        }

        const uploadedBlobUrl = `https://${blobServiceClient.accountName}.blob.core.windows.net/${containerName}/${blobName}`;
        console.log(`Uploaded zip file to Azure Blob Storage: ${uploadedBlobUrl}`);
        return uploadedBlobUrl; // Return the URL of the uploaded blob
    } catch (error) {
        throw new Error("Failed to upload zip file to Azure Blob Storage");
    }
}
