import type { Locale } from '@/i18n/config';
import { MotherboardMap } from './MotherboardMap';
import { FrontPanelPins } from './FrontPanelPins';
import { AirflowDiagram } from './AirflowDiagram';

/**
 * Maps guide steps to the diagram that illustrates them.
 *
 * Keyed by `guideSlug/stepId` so a step id reused across guides — "cooler"
 * appears in more than one — cannot pull in the wrong drawing. Guides that
 * have no diagram simply have no entry, and the renderer skips them.
 */
const registry: Record<string, (locale: Locale) => React.ReactNode> = {
  'assembly-step-by-step/memory': (locale) => <MotherboardMap locale={locale} />,
  'assembly-step-by-step/motherboard': (locale) => <FrontPanelPins locale={locale} />,
  'assembly-step-by-step/case-prep': (locale) => <AirflowDiagram locale={locale} />,
  'cable-management/airflow': (locale) => <AirflowDiagram locale={locale} />,
  'choosing-cooling/measure': (locale) => <MotherboardMap locale={locale} />,
  'troubleshooting-no-post/fans-no-display': (locale) => <FrontPanelPins locale={locale} />,
};

/** Renders the diagram for a step, or nothing when the step has none. */
export function StepDiagram({
  guideSlug,
  stepId,
  locale,
}: {
  guideSlug: string;
  stepId: string;
  locale: Locale;
}) {
  const render = registry[`${guideSlug}/${stepId}`];
  return render ? <>{render(locale)}</> : null;
}

export { MotherboardMap, FrontPanelPins, AirflowDiagram };
