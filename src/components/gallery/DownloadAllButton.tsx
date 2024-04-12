// DownloadButton.client.tsx

'use client';
import { Button } from "@nextui-org/react";
import JSZip from "jszip";

interface DownloadButtonProps {
    userId: string;
}

export default function DownloadButton({ userId }: DownloadButtonProps) {
    const handleDownloadAllImages = async () => {
        console.log("Downloading all images for user with ID:", userId);
        const response = await fetch(`/api/images/${userId}`);
        console.log("Response:", response);
        const zip = await response.json();
        console.log("Images:", zip);
        const zipLink = document.createElement("a");
        zipLink.href = zip.imageUrl; // Set the download link to the image URL
        zipLink.download = "all-images.zip";
        zipLink.click();
    };

    return (
        <Button
            variant="bordered"
            className="p-2.5 text-base border-secondary text-white rounded border-2"
            onClick={handleDownloadAllImages}
        >
            Download all images
        </Button>
    );
};
