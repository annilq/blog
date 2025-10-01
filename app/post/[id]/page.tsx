import { getStaticPostById, getAllStaticPosts } from "@/lib/static-posts";
import DateLabel from "../components/Date";
import Layout from "@/components/layout";

type Props = {
  params: Promise<{ id: string }>;
};

// 生成所有post的静态参数
export async function generateStaticParams() {
  const posts = await getAllStaticPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function Page({ params }: Props) {
  const id = (await params).id;
  const post = await getStaticPostById(id);

  if (!post) {
    return (
      <Layout>
        <div className="w-full h-auto flex flex-col justify-start items-start">
          <div className="text-center">
            <h1>文章未找到</h1>
            <p>抱歉，您要查找的文章不存在。</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full h-auto flex flex-col justify-start items-start">
        <div
          className={`group relative flex flex-col justify-start items-start w-full`}
        >
          <article className="w-full">
            <h1>{post.title}</h1>
            <div className="text-gray-400">
              <DateLabel date={post.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.contentHtml }}></div>
          </article>
        </div>
      </div>
    </Layout>
  );
}

// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = false;
