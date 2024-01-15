import { db } from "@/db";
import { Button } from "@nextui-org/react";

export default async function TopicsPage() {
  const topics: any[] = await db.topic.findMany();

  return (
    <div>
      <h1>Topics page</h1>
      <table>
        <tr>
          <th>name</th>
          <th>description</th>
          <th>created at</th>
          <th>actions</th>
        </tr>
        {topics.map((topic) => (
          <tr key={topic.id}>
            <td>{topic.slug}</td>
            <td>{topic.description}</td>
            <td>{new Date(topic.createdAt).toLocaleString()}</td>
            <td>
              <Button size="sm" color="danger">
                delete
              </Button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
