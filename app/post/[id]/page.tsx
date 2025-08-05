import prisma from "@/lib/prisma";
import { parseContent } from "@/lib/util";
import DateLabel from "../components/Date";
import Layout from "@/components/layout";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const id = (await params).id;
  const post = await prisma.post.findFirst({
    where: {
      id,
    },
    include: {
      categorys: true,
    },
  });

  const contentHtml = await parseContent(post?.content!);

  return (
    <Layout>
      <div className="w-full h-auto flex flex-col justify-start items-start">
        <div
          className={`group relative flex flex-col justify-start items-start w-full`}
        >
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
  );
}
export const revalidate = 60;
