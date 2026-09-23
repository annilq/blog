export default function Loading() {
  return (
    <div className="w-full mx-auto px-2 lg:px-2 p-4 flex-1 flex flex-col pb-8 container max-w-content">
      <div className="animate-pulse flex flex-col gap-4">
        <div className="h-8 w-1/3 rounded bg-skeleton" />
        <div className="h-4 w-2/3 rounded bg-skeleton" />
        <div className="h-4 w-full rounded bg-skeleton" />
        <div className="h-4 w-5/6 rounded bg-skeleton" />
        <div className="h-48 w-full rounded bg-skeleton mt-4" />
      </div>
    </div>
  );
}
