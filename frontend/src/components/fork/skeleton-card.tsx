export default function SkeletonCard() {
  return (
    <div className="flex flex-col h-full bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 animate-pulse">
      <div className="h-5 w-24 rounded-full bg-white/[0.06]" />
      <div className="mt-4 h-6 w-3/4 rounded-lg bg-white/[0.06]" />
      <div className="mt-2 h-5 w-20 rounded-lg bg-white/[0.06]" />
      <div className="mt-4 h-4 w-full rounded bg-white/[0.06]" />
      <div className="mt-2 h-4 w-5/6 rounded bg-white/[0.06]" />
      <div className="mt-6 space-y-2 flex-1">
        <div className="h-4 w-full rounded bg-white/[0.06]" />
        <div className="h-4 w-4/5 rounded bg-white/[0.06]" />
        <div className="h-4 w-3/4 rounded bg-white/[0.06]" />
      </div>
      <div className="mt-6 h-12 w-full rounded-xl bg-white/[0.06]" />
    </div>
  );
}
