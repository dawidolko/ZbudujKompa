/**
 * The average Polish household electricity price, the default of the
 * running-cost calculator.
 *
 * Generated: scripts/update-energy-price.mjs rewrites this file from Eurostat
 * dataset nrg_pc_204 (households, 2,500-4,999 kWh a year, all taxes and levies
 * included, złoty per kWh). Eurostat spreads fixed charges over the kWh used,
 * so the per-kWh rate on a bill is usually a little lower.
 */
export const electricityPrice = {
  pricePerKwh: 1.2724,
  period: '2026-S1',
  provisional: true,
  published: '2026-10-19',
  source: {
    label: 'Eurostat nrg_pc_204',
    url: 'https://ec.europa.eu/eurostat/databrowser/view/nrg_pc_204/default/table',
  },
};
