import { setRequestLocale, getTranslations } from 'next-intl/server'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { QuoteForm } from '@/components/quote/QuoteForm'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ service?: string }>
}

export default async function QuotePage({ params, searchParams }: Props) {
  const { locale } = await params
  const { service } = await searchParams
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'quote' })

  return (
    <div className="pt-32 pb-24 px-6 bg-[#0a0a0a] min-h-screen">
      <div className="max-w-5xl mx-auto">
        <QuoteForm preselectedService={service} />
      </div>
    </div>
  )
}
