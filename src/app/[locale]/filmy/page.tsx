import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PageHeader, SectionHeading } from '@/components/layout/PageHeader';
import { VideoCard } from '@/components/widgets/VideoCard';
import { Reveal } from '@/components/motion/Reveal';
import { getDictionary } from '@/i18n';
import { isLocale, locales, localeTags, type Locale } from '@/i18n/config';
import { videos, videosByCategory, type VideoCategory } from '@/lib/videos';
import { absoluteLocaleUrl, canonicalUrl } from '@/lib/site';

type Params = { locale: string };

export function generateStaticParams(): Params[] {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.widgets.videosTitle,
    description: dict.widgets.videosLead,
    alternates: {
      canonical: canonicalUrl(locale, '/filmy'),
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], absoluteLocaleUrl(code, '/filmy')]),
      ),
    },
  };
}

const CATEGORY_ORDER: VideoCategory[] = [
  'assembly',
  'cooling',
  'components',
  'testing',
  'troubleshooting',
];

export default async function VideosPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dict = getDictionary(typedLocale);

  return (
    <>
      <Breadcrumbs locale={typedLocale} items={[{ label: dict.widgets.videosTitle }]} />
      <PageHeader
        photo="hero-workbench"
        locale={typedLocale}
        title={dict.widgets.videosTitle}
        lead={dict.widgets.videosLead}
      />

      {CATEGORY_ORDER.map((category) => {
        const inCategory = videosByCategory(category);
        if (inCategory.length === 0) return null;

        return (
          <section key={category} className="container-page pb-12">
            <SectionHeading title={dict.videoCategory[category]} id={`category-${category}`} />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {inCategory.map((video, index) => (
                <Reveal
                  as="li"
                  key={video.id}
                  delay={((index % 3) + 1) as 1 | 2 | 3}
                  className="flex"
                >
                  <VideoCard video={video} locale={typedLocale} className="w-full" />
                </Reveal>
              ))}
            </ul>
          </section>
        );
      })}

      <section className="container-page pb-14">
        <p className="max-w-3xl text-xs leading-relaxed text-text-muted">
          {dict.widgets.videoNote} {dict.widgets.videoCount(videos.length)}
        </p>
      </section>
    </>
  );
}
