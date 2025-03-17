import { format } from "date-fns"

import Layout from "@/components/layout";
import { Card } from "@mui/joy";
import { addThought, deleteThought, getThoughts } from "./actions";
import ThoughtForm from "./ThoughtForm"
import { Trash2 } from "lucide-react";
import ThoughtDelBtn from "./ThoughtDelBtn";

export default async function Thoughts() {

  const thoughts = await getThoughts()

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="space-y-4">
          <ThoughtForm addThought={addThought} />

          {thoughts.map((thought) => (
            <Card variant="soft" className="flex flex-col" key={thought.id}>
              <div className="whitespace-pre-wrap">
                {thought.content}
              </div>
              <div className="flex justify-between text-sm text-foreground">
                <time dateTime={thought.createdAt.toISOString()}>{format(thought.createdAt, "yyyy-MM-dd HH:mm:ss")}</time>
                <ThoughtDelBtn id={thought.id} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}

