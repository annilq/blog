import Link from "next/link";
import DateLabel from "./components/Date";
import { getAllPostsMetaData } from "./util";

export default function Post() {
  const data = getAllPostsMetaData();
  return (
    <div className="relative w-full h-auto flex flex-col justify-start items-start">
      <div className={`group relative flex flex-col justify-start items-start w-full`}>
        <ul className="mt-4 space-y-6">
          {data?.map(({ name, date, title }) => (
            <li key={name}>
              <Link href={`/post/${name}`} className="block text-xl font-semibold text-foreground hover:text-link">
                {title}
              </Link>
              {date && (
                <small className="text-sm text-gray-500">
                  <DateLabel date={date} />
                </small>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
