"use client";

import { db } from "@/db";

export default async function TopicShowPage({
  params,
}: {
  params: { slug: string };
}) {
  const topic = await db.topic.findUnique({
    where: { slug: params.slug },
  });

  return (
    <>
      <ul>
        <li>name: {topic?.slug}</li>
        <li>description: {topic?.description}</li>
      </ul>
    </>
  );
}
