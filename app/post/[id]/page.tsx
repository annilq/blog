import prisma from '@/lib/prisma'
import { parseContent } from "@/lib/util";
import DateLabel from "../components/Date";
import { Metadata } from "next";


type Props = {
  params: { id: string };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {

  const post = await prisma.post.findFirst({
    where: {
      id: params.id
    }
  })
  return {
    title: post?.title,
  };
}

export default async function Page({ params }: Props) {

  const post = await prisma.post.findFirst({
    where: {
      id: params.id
    }
  })

  const contentHtml = await parseContent(post?.content!)

  return (
    <div className="relative w-full h-auto flex flex-col justify-start items-start">
      <div className={`group relative flex flex-col justify-start items-start w-full`}>
        <article>
          <h1 className="text-4xl font-bold my-4">{post?.title}</h1>
          <div className="text-gray-400">
            <DateLabel date={post?.createdAt!} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: contentHtml }}></div>
        </article>
      </div>
    </div>
  )
}