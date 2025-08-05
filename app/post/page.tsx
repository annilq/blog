import prisma from "@/lib/prisma";
import Link from "next/link";
import DateLabel from "./components/Date";
import { Tag } from "@/components/Tag";
import Layout from "@/components/layout";
import SearchInput from "./components/SearchInput";

export default async function Post({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const query = (await searchParams)?.query || "";

  const data = await prisma.post.findMany({
    ...(query && {
      where: {
        categorys: {
          some: {
            id: query,
          },
        },
      },
    }),
    orderBy: {
      createdAt: "desc",
    },
    include: {
      categorys: true,
    },
  });

  let category = null;
  if (query) {
    category = await prisma.category.findFirst({
      where: {
        id: query,
      },
    });
  }

  return (
    <Layout>
      <div className="w-full h-auto flex flex-col justify-start items-start">
        {data && <SearchInput data={data} />}
        {category && <Tag tag={category} canClear />}
        <div
          className={`group relative flex flex-col justify-start items-start w-full`}
        >
          <div className="space-y-4">
            {data?.map(({ id, createdAt, title, categorys = [] }) => (
              <div key={id}>
                <Link
                  href={`/post/${id}`}
                  className="block text-xl font-semibold text-foreground hover:text-link"
                >
                  {title}
                </Link>
                <div className="flex items-center gap-2">
                  {createdAt && (
                    <small className="text-sm text-gray-500">
                      <DateLabel date={createdAt} />
                    </small>
                  )}
                  {categorys?.map((category) => (
                    <Tag key={category.id} tag={category} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
export const runtime = "edge";
export const revalidate = 60;
