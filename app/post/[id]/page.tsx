import prisma from '@/lib/prisma'
import { parseContent } from "@/lib/util";
import DateLabel from "../components/Date";
import { Metadata } from "next";
import Layout from '@/components/layout';


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
    },
    include: {
      categorys: true
    }
  })

  const contentHtml = await parseContent(post?.content!)

  return (
    <Layout>
      <div className="w-full h-auto flex flex-col justify-start items-start">
        <div className={`group relative flex flex-col justify-start items-start w-full`}>
          <article>
            <h1>{post?.title}</h1>
            <div className="text-gray-400">
              {post?.createdAt && <DateLabel date={post?.createdAt!} />}
            </div>
            <div dangerouslySetInnerHTML={{ __html: contentHtml }}></div>
          </article>
        </div>
      </div>
    </Layout>
  )
}