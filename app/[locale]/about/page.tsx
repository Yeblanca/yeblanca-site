import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { getPayloadClient } from '@/lib/payload';
import { ExternalLink } from 'lucide-react';

function IconGithub({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function IconLinkedin({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

type Props = { params: Promise<{ locale: string }> };

const STACK = [
  'Next.js',
  'React',
  'TypeScript',
  'Payload CMS',
  'Supabase',
  'PostgreSQL',
  'Tailwind CSS',
  'Node.js',
  'MedusaJS',
  'Stripe',
  'Resend',
  'Vercel',
];

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'about' });

  let available = true;
  try {
    const payload = await getPayloadClient();
    const settings = await payload.findGlobal({
      slug: 'site-settings',
    });
    available = settings?.availableForProjects ?? true;
  } catch {
    // Payload not ready
  }

  return (
    <div className="pt-32 pb-24 px-6 bg-[#0a0a0a] min-h-screen">
      <div className="max-w-5xl mx-auto space-y-24">
        {/* Header */}
        <div>
          <SectionLabel label={t('page_label')} />
          <h1 className="font-sans font-bold text-[clamp(2.5rem,6vw,4rem)] tracking-[-0.03em] text-[#f0f0f0]">
            {t('page_heading')}
          </h1>
        </div>

        {/* Origin */}
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <SectionLabel label={t('origin_label')} />
            <h2 className="font-sans font-medium text-[1.75rem] tracking-[-0.02em] text-[#f0f0f0] mb-6">
              {t('origin_heading')}
            </h2>
            <p className="font-sans font-light text-[1rem] text-[rgba(240,240,240,0.65)] leading-[1.8]">
              {t('origin_body')}
            </p>
          </div>
        </div>

        {/* Founder */}
        <div>
          <SectionLabel label={t('founder_label')} />
          <div className="p-8 bg-[#111111] border-l-2 border-l-[#FF3E7F] border-[0.5px] border-[rgba(240,240,240,0.08)] rounded-[2px] max-w-xl">
            {/* Avatar placeholder */}
            <div className="w-16 h-16 rounded-full bg-[rgba(255,62,127,0.15)] border border-[rgba(255,62,127,0.30)] mb-6 flex items-center justify-center">
              <span className="font-sans font-bold text-[1.25rem] text-[#FF3E7F]">
                JP
              </span>
            </div>

            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="font-sans font-medium text-[1.125rem] text-[#f0f0f0]">
                  {t('founder_name')}
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.10em] text-[rgba(240,240,240,0.45)] mt-1">
                  {t('founder_title')}
                </p>
              </div>

              {/* Available badge */}
              <span
                className={`inline-flex items-center h-6 px-3 rounded-[2px] font-mono text-[10px] uppercase tracking-[0.10em] border-[0.5px] shrink-0 ${
                  available
                    ? 'bg-[rgba(255,62,127,0.15)] border-[rgba(255,62,127,0.30)] text-[#FF3E7F]'
                    : 'bg-[rgba(240,240,240,0.05)] border-[rgba(240,240,240,0.10)] text-[rgba(240,240,240,0.40)]'
                }`}
              >
                {available
                  ? t('available_badge')
                  : t('unavailable_badge')}
              </span>
            </div>

            <p className="font-sans font-light text-[0.9375rem] text-[rgba(240,240,240,0.60)] leading-[1.7] mb-6">
              {t('founder_bio')}
            </p>

            <div className="flex gap-4">
              <a
                href="https://github.com/bytewing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgba(240,240,240,0.40)] hover:text-[#FF3E7F] transition-colors"
                aria-label="GitHub"
              >
                <IconGithub size={16} />
              </a>
              <a
                href="https://linkedin.com/in/jplozano"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgba(240,240,240,0.40)] hover:text-[#FF3E7F] transition-colors"
                aria-label="LinkedIn"
              >
                <IconLinkedin size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Stack */}
        <div>
          <SectionLabel label={t('stack_label')} />
          <div className="flex flex-wrap gap-2 mt-4">
            {STACK.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center h-7 px-3 border-[0.5px] border-[rgba(240,240,240,0.12)] rounded-[2px] font-mono text-[11px] uppercase tracking-[0.08em] text-[rgba(240,240,240,0.50)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
