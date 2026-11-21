/*
 * Pure logic for the electricity price refresh: reading Eurostat's household
 * electricity price dataset and turning its newest figure into the data module
 * the running-cost calculator reads. Nothing here touches the network or the
 * disk, so it can be tested against a sample response.
 */

/*
 * Eurostat dataset nrg_pc_204: household electricity prices, every six months,
 * for Poland, the standard 2,500-4,999 kWh a year band, all taxes and levies
 * included, in złoty per kWh. The JSON-stat API is free and needs no key.
 */
export const EUROSTAT_URL =
  'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/nrg_pc_204' +
  '?geo=PL&nrg_cons=KWH2500-4999&tax=I_TAX&currency=NAC&unit=KWH&lastTimePeriod=4&format=JSON';

export const EUROSTAT_PAGE =
  'https://ec.europa.eu/eurostat/databrowser/view/nrg_pc_204/default/table';

/* A Polish household price outside this band is a broken response, not a price. */
const PLAUSIBLE = [0.3, 5];

/*
 * The newest period that has a value, or null when the response holds none.
 * JSON-stat stores values by flat index; with every other dimension fixed to
 * one entry, that index is the position of the period in the time dimension.
 */
export function latestPrice(response) {
  const index = response?.dimension?.time?.category?.index;
  const values = response?.value;
  if (!index || !values) return null;

  const periods = Object.entries(index)
    .filter(([, position]) => typeof values[String(position)] === 'number')
    .sort(([a], [b]) => a.localeCompare(b));
  const newest = periods.at(-1);
  if (!newest) return null;

  const [period, position] = newest;
  const price = values[String(position)];
  if (price < PLAUSIBLE[0] || price > PLAUSIBLE[1]) return null;

  return {
    pricePerKwh: price,
    period,
    provisional: response.status?.[String(position)] === 'p',
    published: String(response.updated ?? '').slice(0, 10),
  };
}

/* Writes the data module. Prettier tidies the layout in the workflow. */
export function renderEnergyModule(latest) {
  return `/**
 * The average Polish household electricity price, the default of the
 * running-cost calculator.
 *
 * Generated: scripts/update-energy-price.mjs rewrites this file from Eurostat
 * dataset nrg_pc_204 (households, 2,500-4,999 kWh a year, all taxes and levies
 * included, złoty per kWh). Eurostat spreads fixed charges over the kWh used,
 * so the per-kWh rate on a bill is usually a little lower.
 */
export const electricityPrice = ${JSON.stringify(
    {
      ...latest,
      source: { label: 'Eurostat nrg_pc_204', url: EUROSTAT_PAGE },
    },
    null,
    2,
  )};
`;
}
