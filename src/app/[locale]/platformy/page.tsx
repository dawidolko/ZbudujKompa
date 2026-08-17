import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { LinkCard } from '@/components/ui/Card';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader, SectionHeading } from '@/components/layout/PageHeader';
import { getDictionary } from '@/i18n';
import { isLocale, localePath, locales, type Locale } from '@/i18n/config';
import { getSocketsByVendor } from '@/lib/sockets';
import { canonicalUrl, absoluteLocaleUrl } from '@/lib/site';
import { localeTags } from '@/i18n/config';
import { t } from '@/lib/utils';

type Params = { locale: string };

export function generateStaticParams(): Params[] {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.platform.title,
    description: dict.platform.lead,
    alternates: {
      canonical: canonicalUrl(locale, '/platformy'),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, '/platformy')]),
      ),
    },
  };
}

export default async function PlatformsPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  const vendors = [
    { key: 'amd' as const, label: 'AMD', sockets: getSocketsByVendor('amd') },
    { key: 'intel' as const, label: 'Intel', sockets: getSocketsByVendor('intel') },
  ];

  return (
    <>
      <Breadcrumbs locale={typedLocale} items={[{ label: dict.platform.title }]} />
      <PageHeader
        photo="motherboard-closeup"
        locale={typedLocale}
        title={dict.platform.title}
        lead={dict.platform.lead}
      />

      {vendors.map((vendor) => (
        <section key={vendor.key} className="container-page pb-14">
          <SectionHeading title={vendor.label} id={`vendor-${vendor.key}`} />

          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {vendor.sockets.map((socket) => (
              <li key={socket.slug} className="flex">
                <LinkCard
                  className="w-full"
                  href={localePath(typedLocale, `/platformy/${socket.slug}`)}
                  eyebrow={
                    <Badge
                      tone={
                        socket.status === 'current'
                          ? 'success'
                          : socket.status === 'mature'
                            ? 'neutral'
                            : 'warning'
                      }
                    >
                      {socket.status === 'current'
                        ? dict.platform.statusCurrent
                        : socket.status === 'mature'
                          ? dict.platform.statusMature
                          : dict.platform.statusLegacy}
                    </Badge>
                  }
                  title={socket.name}
                  description={t(socket.tagline, typedLocale)}
                  footer={
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                      <div>
                        <dt className="text-text-muted">{dict.platform.launched}</dt>
                        <dd className="font-medium text-text-secondary">{socket.launched}</dd>
                      </div>
                      <div>
                        <dt className="text-text-muted">{dict.platform.memory}</dt>
                        <dd className="font-medium text-text-secondary">
                          {socket.memory.map((m) => m.toUpperCase()).join(' / ')}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-text-muted">PCIe</dt>
                        <dd className="font-medium text-text-secondary">{socket.pcie}</dd>
                      </div>
                      <div>
                        <dt className="text-text-muted">{dict.platform.chipsets}</dt>
                        <dd className="font-medium text-text-secondary">
                          {socket.chipsets.length}
                        </dd>
                      </div>
                    </dl>
                  }
                />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
