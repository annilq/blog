import prisma from '@/lib/prisma'
import Link from "next/link";
import DateLabel from "./components/Date";

export default async function Post() {

  const data = await prisma.post.findMany({});

  return (
    <div className="relative w-full h-auto flex flex-col justify-start items-start">
      <div className={`group relative flex flex-col justify-start items-start w-full`}>
        <ul className="mt-4 space-y-6">
          {data?.map(({ id, createdAt, title }) => (
            <li key={id}>
              <Link href={`/post/${id}`} className="block text-xl font-semibold text-foreground hover:text-link">
                {title}
              </Link>
              {createdAt && (
                <small className="text-sm text-gray-500">
                  <DateLabel date={createdAt} />
                </small>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
