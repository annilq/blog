import { Suspense } from "react";
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

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="space-y-4">
          {session?.user && <ThoughtForm addThought={addThought} />}

          <Suspense fallback={<ThoughtsListSkeleton />}>
            <ThoughtsList session={session} />
          </Suspense>
        </div>
      </div>
    </Layout>
  );
}

async function ThoughtsList({ session }: { session: Awaited<ReturnType<typeof auth>> }) {
  const thoughts = await getThoughts();

  return (
    <>
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
    </>
  );
}

function ThoughtsListSkeleton() {
  return (
    <div className="space-y-4">
      {[0, 1, 2].map((i) => (
        <Card variant="soft" className="flex flex-col animate-pulse" key={i}>
          <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-1/3 mt-2 rounded bg-gray-200 dark:bg-gray-700" />
        </Card>
      ))}
    </div>
  );
}

export const revalidate = 60;
// export const runtime = "edge";
