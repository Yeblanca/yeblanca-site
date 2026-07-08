export function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-4 h-px bg-accent shrink-0" />
      <span className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-muted">
        {label}
      </span>
    </div>
  )
}
