/** A page a price was read from. */
export type PriceSource = { label: string; url: string };

/**
 * Why a part has no price.
 *
 * - `discontinued`: a shop marks it as withdrawn from sale.
 * - `unreleased`: announced or rumoured, but never on sale.
 * - `no-offer`: no credible new offer was found in Polish shops.
 */
export type UnavailableReason = 'discontinued' | 'unreleased' | 'no-offer';

type PriceRecordBase = {
  /** The day the figures were checked, as YYYY-MM-DD. */
  checkedAt: string;
  /** The pages the figures were read from. */
  sources: PriceSource[];
  /** What a reader of the data should know about how the figures were chosen. */
  note?: string;
  /** Set when the automated refresh must leave this record alone. */
  manual?: boolean;
};

export type PriceRecord = PriceRecordBase &
  (
    | { min: number; max: number; reason?: undefined }
    | {
        min: null;
        max: null;
        reason: UnavailableReason;
      }
  );
