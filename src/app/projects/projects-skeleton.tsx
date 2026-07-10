// Fallback estático exibido enquanto o explorador de filtros (client) hidrata.
export function ProjectsSkeleton() {
  return (
    <div aria-hidden>
      <section className="mx-auto max-w-6xl px-6 pb-6">
        <div className="h-44 rounded-xl border border-border bg-surface animate-pulse" />
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-36 rounded-xl border border-border bg-surface animate-pulse"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
