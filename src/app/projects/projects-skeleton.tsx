export function ProjectsSkeleton() {
  return (
    <div aria-hidden>
      <section className="mx-auto max-w-6xl px-6 pb-6">
        <div className="h-44 rounded-xl border border-border bg-surface animate-pulse" />
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="grid md:grid-cols-[240px_1fr] overflow-hidden rounded-2xl border border-border bg-surface animate-pulse"
            >
              <div className="aspect-video md:aspect-auto md:min-h-[190px] bg-surface-elevated/60" />
              <div className="p-7 space-y-3">
                <div className="h-6 w-2/5 rounded bg-surface-elevated" />
                <div className="h-4 w-4/5 rounded bg-surface-elevated/70" />
                <div className="h-4 w-3/5 rounded bg-surface-elevated/70" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
