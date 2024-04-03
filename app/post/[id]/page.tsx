import { getPostData } from "@/app/post/util";
import DateLabel from "../components/Date";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'memos post',
}

export default async function Page({ params }: { params: { id: string } }) {

  const { source, title, date, contentHtml } = await getPostData(params.id)

  return (
    <div className="relative w-full h-auto flex flex-col justify-start items-start">
      <div className={`group relative flex flex-col justify-start items-start w-full`}>
        <article>
          <h1 className="text-4xl font-bold my-4">{title}</h1>
          <div className="text-gray-400">
            <DateLabel date={date} />
          </div>
          {/* <CustomMDX
            // h1 now renders with `large-text` className
            source={source}
          /> */}
          <div dangerouslySetInnerHTML={{ __html: contentHtml }}></div>
        </article>
      </div>
    </div>
  )
}