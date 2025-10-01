import Link from "next/link";
import DateLabel from "./components/Date";
import { Tag } from "@/components/Tag";
import Layout from "@/components/layout";
import SearchInput from "./components/SearchInput";
import { getAllStaticPosts, getAllTags } from "@/lib/static-posts";

export default async function Post({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const query = (await searchParams)?.query || "";

  // 获取所有静态文章数据
  const allPosts = await getAllStaticPosts();
  
  // 根据查询条件过滤文章
  const data = query 
    ? allPosts.filter(post => post.tags === query)
    : allPosts;

  // 获取标签信息
  let category = null;
  if (query) {
    const tags = await getAllTags();
    if (tags.includes(query)) {
      category = { id: query, name: query };
    }
  }

  return (
    <Layout>
      <div className="w-full h-auto flex flex-col justify-start items-start">
        {data && <SearchInput data={data} />}
        {category && <Tag tag={category} canClear />}
        <div
          className={`group relative flex flex-col justify-start items-start w-full gap-4`}
        >
            {data?.map(({ id, date, title, tags }) => (
              <div key={id}>
                <Link
                  href={`/post/${id}`}
                  className="block text-xl font-semibold text-foreground hover:text-link"
                >
                  {title}
                </Link>
                <div className="flex items-center gap-2">
                  {date && (
                    <small className="text-sm text-gray-500">
                      <DateLabel date={date} />
                    </small>
                  )}
                  {tags && (
                    <Tag key={tags} tag={{ id: tags, name: tags }} />
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
}
// 静态生成配置
export const dynamic = 'force-static';
export const revalidate = false;

// 生成静态参数（为标签查询预生成页面）
export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map(tag => ({
    query: tag,
  }));
}
