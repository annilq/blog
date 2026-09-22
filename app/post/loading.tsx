export default function PostLoading() {
  return (
    <div className="w-full mx-auto px-2 lg:px-2 p-4 flex-1 flex flex-col pb-8 container max-w-4xl">
      <div className="animate-pulse flex flex-col gap-6">
        <div className="h-10 w-full rounded bg-gray-200 dark:bg-gray-700" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="h-5 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-3 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        ))}
      </div>
    </div>
  );
}
