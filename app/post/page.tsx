import Link from "next/link";
import DateLabel from "./components/Date";
import { Tag } from "@/components/Tag";
import Layout from "@/components/layout";
import SearchInput from "./components/SearchInput";
import { getAllStaticPostsMeta, getAllTags } from "@/lib/static-posts";

export default async function Post({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const query = (await searchParams)?.query || "";

  // 获取所有静态文章元数据（不解析内容，提升性能）
  const allPosts = await getAllStaticPostsMeta();
  // 根据查询条件过滤文章
  const data = query 
    ? allPosts.filter(post => post.tags === query)
    : allPosts;
    console.log(query);

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
// 动态渲染配置，支持查询参数
export const dynamic = 'force-dynamic';
