import { Suspense } from "react";
import { format } from "date-fns";
import type { Session } from "next-auth";

import Layout from "@/components/layout";
import { Card } from "@mui/joy";
import { addThought, getThoughts } from "./actions";
import ThoughtForm from "./ThoughtForm";
import ThoughtDelBtn from "./ThoughtDelBtn";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "碎碎念",
  description: "短句、随记和还没成文的想法 —— 想到什么写什么。",
};

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

async function ThoughtsList({ session }: { session: Session | null }) {
  const thoughts = await getThoughts();

  return (
    <>
      {thoughts.map((thought) => (
        <Card variant="soft" className="flex flex-col" key={thought.id}>
          <div className="whitespace-pre-wrap">{thought.content}</div>
          <div className="flex justify-between text-meta text-foreground">
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
          <div className="h-4 w-2/3 rounded bg-skeleton" />
          <div className="h-3 w-1/3 mt-2 rounded bg-skeleton" />
        </Card>
      ))}
    </div>
  );
}

export const revalidate = 60;
// export const runtime = "edge";
