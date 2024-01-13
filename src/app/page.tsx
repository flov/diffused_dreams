export const revalidate = 3;

import GenerateImageForm from "@/components/GenerateImageForm";
import TopicCreateForm from "@/components/topics/TopicCreateForm";
import { db } from "@/db";

export default async function Home() {
  const posts = await db.post.findMany();

  const renderedPosts = posts.map((post: any) => (
    <div key={post.id}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  ));

  return (
    <div>
      <GenerateImageForm />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">{renderedPosts}</div>
        <div className="">
          <TopicCreateForm />
        </div>
      </div>
    </div>
  );
}
