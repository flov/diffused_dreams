import { GeneratedImage } from "@prisma/client";
import { db } from "..";

export function fetchImagesByUserId(userId: string): Promise<GeneratedImage[]> {
  return db.generatedImage.findMany({
    where: { userId },
  });
}
