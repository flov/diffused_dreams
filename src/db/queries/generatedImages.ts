import { GeneratedImage } from "@prisma/client";
import { db } from "..";
import { DEFAULT_PAGINATION_LIMIT } from "@/utils/constants";

export function fetchImagesByUserId(
  userId: string,
  page = 1
): Promise<GeneratedImage[]> {
  // todo implement pagination logic here
  const skip = (page - 1) * DEFAULT_PAGINATION_LIMIT; // calculate the offset

  return db.generatedImage.findMany({
    where: { userId },
    take: DEFAULT_PAGINATION_LIMIT,
    skip,
    orderBy: { createdAt: "desc" }, // ordering by createdAt in descending order to get the latest images first
  });
}
