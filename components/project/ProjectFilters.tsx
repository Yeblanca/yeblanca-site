'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { ProjectCard, type ProjectCardData } from './ProjectCard'

type FilterKey = 'serviceType' | 'stack' | 'year'

export function ProjectFilters({ projects }: { projects: ProjectCardData[] }) {
  const t = useTranslations('projects')
  const [activeType, setActiveType] = useState<string>('all')
  const [activeStack, setActiveStack] = useState<string>('all')
  const [activeYear, setActiveYear] = useState<string>('all')

  const types = useMemo(() => {
    const s = new Set(projects.map((p) => p.serviceType))
    return Array.from(s).sort()
  }, [projects])

  const stacks = useMemo(() => {
    const s = new Set(projects.flatMap((p) => p.stack.map((st) => st.tech)))
    return Array.from(s).sort()
  }, [projects])

  const years = useMemo(() => {
    const s = new Set(projects.map((p) => String(p.year)))
    return Array.from(s).sort((a, b) => Number(b) - Number(a))
  }, [projects])

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (activeType !== 'all' && p.serviceType !== activeType) return false
      if (activeStack !== 'all' && !p.stack.some((s) => s.tech === activeStack)) return false
      if (activeYear !== 'all' && String(p.year) !== activeYear) return false
      return true
    })
  }, [projects, activeType, activeStack, activeYear])

  function FilterBar({
    label,
    values,
    active,
    onChange,
  }: {
    label: string
    values: string[]
    active: string
    onChange: (v: string) => void
  }) {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-[rgba(240,240,240,0.55)] mr-1">
          {label}
        </span>
        <button
          onClick={() => onChange('all')}
          className={`h-8 px-3 rounded-[2px] font-mono text-[0.75rem] uppercase tracking-[0.10em] border-[0.5px] transition-colors ${
            active === 'all'
              ? 'bg-[rgba(255,62,127,0.15)] border-[rgba(255,62,127,0.30)] text-[#FF3E7F]'
              : 'border-[rgba(240,240,240,0.10)] text-[rgba(240,240,240,0.65)] hover:border-[rgba(240,240,240,0.25)]'
          }`}
        >
          {t('filter_all')}
        </button>
        {values.map((v) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className={`h-8 px-3 rounded-[2px] font-mono text-[0.75rem] uppercase tracking-[0.10em] border-[0.5px] transition-colors ${
              active === v
                ? 'bg-[rgba(255,62,127,0.15)] border-[rgba(255,62,127,0.30)] text-[#FF3E7F]'
                : 'border-[rgba(240,240,240,0.10)] text-[rgba(240,240,240,0.65)] hover:border-[rgba(240,240,240,0.25)]'
            }`}
          >
            {v}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div>
      {/* Filter bars */}
      <div className="space-y-3 mb-12">
        <FilterBar
          label={t('filter_type')}
          values={types}
          active={activeType}
          onChange={setActiveType}
        />
        <FilterBar
          label={t('filter_year')}
          values={years}
          active={activeYear}
          onChange={setActiveYear}
        />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="font-mono text-[0.75rem] uppercase tracking-[0.10em] text-[rgba(240,240,240,0.40)] py-16 text-center">
          {t('no_results')}
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
