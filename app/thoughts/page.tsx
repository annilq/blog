import { format } from "date-fns";

import Layout from "@/components/layout";
import { Card } from "@mui/joy";
import { addThought, getThoughts } from "./actions";
import ThoughtForm from "./ThoughtForm";
import ThoughtDelBtn from "./ThoughtDelBtn";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Thoughts() {
  const session = await auth();
  const thoughts = await getThoughts();

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="space-y-4">
          {session?.user && <ThoughtForm addThought={addThought} />}

          {thoughts.map((thought) => (
            <Card variant="soft" className="flex flex-col" key={thought.id}>
              <div className="whitespace-pre-wrap">{thought.content}</div>
              <div className="flex justify-between text-sm text-foreground">
                <time dateTime={thought.createdAt.toISOString()}>
                  {format(thought.createdAt, "yyyy-MM-dd HH:mm:ss")}
                </time>
                {session?.user && <ThoughtDelBtn id={thought.id} />}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
export const revalidate = 60;
export const runtime = "edge";
