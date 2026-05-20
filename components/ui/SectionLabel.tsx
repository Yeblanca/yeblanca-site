export function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-4 h-px bg-[#FF3E7F] shrink-0" />
      <span className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.65)]">
        {label}
      </span>
    </div>
  )
}
