import { getStaticPostById, getAllStaticPosts } from "@/lib/static-posts";
import DateLabel from "../components/Date";
import Layout from "@/components/layout";
import { extractExcerpt } from "@/lib/util";
import { OG_IMAGE } from "@/lib/site";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

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

/*
 * 文章详情页被分享得最多，此前它继承的是根 layout 的占位标题（"one piece"）——
 * 一篇技术文章的链接卡片上写着 "one piece"，等于没有标题。
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const post = await getStaticPostById(id);

  if (!post) {
    return { title: "文章未找到" };
  }

  const description = extractExcerpt(post.content);

  return {
    title: post.title,
    // 只有标题和代码的文章取不到摘要（extractExcerpt 返回空串）—— 这时留空，
    // 让根 layout 的描述继承下来，而不是塞一句空话进去。
    description: description || undefined,
    openGraph: {
      type: "article",
      title: post.title,
      description: description || undefined,
      publishedTime: new Date(post.date).toISOString(),
      tags: post.tags ? [post.tags] : undefined,
      images: [{ url: OG_IMAGE, alt: post.title }],
    },
  };
}

export default async function Page({ params }: Props) {
  const id = (await params).id;
  const post = await getStaticPostById(id);

  /*
   * 真 404，而不是「渲染一段文案 + HTTP 200」。原来那个 fallback 还自称居中
   * （内层挂了 text-center），但父级是 items-start —— 它从来没居中过。
   * notFound() 会交给 app/not-found.tsx 并把响应码变成 404（本项目是标准 SSR，
   * next.config.mjs 没有 output: 'export'），搜索引擎不会再把这个地址当正常页面收录。
   */
  if (!post) {
    notFound();
  }

  return (
    <Layout>
      <div className="w-full h-auto flex flex-col justify-start items-start">
        <div
          className={`group relative flex flex-col justify-start items-start w-full`}
        >
          <article className="w-full">
            <h1>{post.title}</h1>
            <div className="text-meta text-muted">
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
