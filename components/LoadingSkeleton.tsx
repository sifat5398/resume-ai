export function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 w-1/3 rounded-lg bg-white/10" />
      <div className="h-4 w-2/3 rounded bg-white/10" />
      <div className="grid gap-3 sm:grid-cols-2 mt-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 rounded-xl bg-white/10" />
        ))}
      </div>
    </div>
  );
}

export function ReviewHistorySkeleton() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden animate-pulse">
      <div className="grid grid-cols-[1fr_80px_120px_40px] gap-4 px-5 py-3 border-b border-white/10">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-3 rounded bg-white/10" />
        ))}
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="grid grid-cols-[1fr_80px_120px_40px] gap-4 px-5 py-4 border-b border-white/5">
          <div className="h-3.5 rounded bg-white/10" />
          <div className="h-5 w-10 mx-auto rounded-full bg-white/10" />
          <div className="h-3.5 w-20 rounded bg-white/10" />
          <div className="h-5 w-5 mx-auto rounded bg-white/10" />
        </div>
      ))}
    </div>
  );
}

export function ReviewPageSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="flex flex-col sm:flex-row gap-8 items-center">
        <div className="h-44 w-44 rounded-full bg-white/10" />
        <div className="flex-1 space-y-3">
          <div className="h-6 w-1/2 rounded-lg bg-white/10" />
          <div className="h-4 w-3/4 rounded bg-white/10" />
          <div className="h-4 w-1/2 rounded bg-white/10" />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 rounded-xl bg-white/10" />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-36 rounded-xl bg-white/10" />
        <div className="h-36 rounded-xl bg-white/10" />
      </div>
    </div>
  );
}
