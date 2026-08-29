/**
 * Pricing.
 *
 * Packaging (from Sue-Ann): Smart Screener and Vision are never sold
 * separately — they come included with Horizon or Bridge. Horizon and Bridge
 * can be combined. Anchors are "from" prices; everything above the entry tier
 * is scoped to a quote.
 *
 * Confirmed prices:
 *   Horizon — from $800/mo, one study at one site. Ad spend is the client's own
 *             budget, set separately. NO management or optimization fee.
 *   Bridge  — from $1,200 per indication, across multiple sites.
 *
 * The demo/pricing form is the CTA target for every tier.
 */

export const PRICING_FORM = 'https://forms.clinicontact.com/pricing';

/**
 * Two ways to buy, one principle. The transparent model is the flagship; the
 * all-inclusive is the accommodation for buyers who want one number, kept honest
 * by a written media floor so it is never the old hide-the-split vendor package.
 * This reconciles the two-model pricing toward the transparent media-at-cost
 * story (see the Bridge productization brief, §8.4).
 */
export const PRINCIPLE = 'We never make more by spending more of your budget.';

export const MODELS = [
  {
    tag: 'Flagship',
    name: 'Transparent',
    short: 'A monthly fee, and your ad spend passed through at cost. You see every dollar.',
    desc: 'A monthly fee, and your ad spend passed through at cost. You see every dollar, we take no cut, and when a campaign wins on a smaller budget, that saving is yours to keep.',
    who: 'Site networks, SMOs, CROs, sponsors, and anyone who wants control of the spend.',
    featured: true,
  },
  {
    tag: 'Prefer one number?',
    name: 'All-inclusive',
    short: 'One number, for teams who would rather not manage spend, with the media floor in writing.',
    desc: 'We package it into a single price, for teams who would rather not manage spend separately. It commits to a media floor in writing, so all-inclusive never means a quietly starved campaign.',
    who: 'Academic and full-fee studies that want it handled end to end.',
  },
];

export const MODELS_CONTRAST =
  'Most recruitment is sold as one all-inclusive price that quietly bundles your ad spend, so you never see what the media cost or who kept the difference. We show every dollar, and even our all-inclusive option puts the media floor in writing.';

/** Included in every package — this is the core of the "combo it" story. */
export const ALWAYS_INCLUDED = [
  { name: 'Smart Screener', note: 'I/E prescreening, SMS OTP, eConsent' },
  { name: 'Vision', note: 'the recruitment portal: messaging, scheduling, integrations, reporting' },
];

export const TIERS = [
  {
    id: 'horizon',
    name: 'Horizon',
    tagline: 'The recruitment engine',
    price: '$800',
    unit: '/month',
    priceNote: 'One study, one site. We build and manage the campaigns; you set the ad spend and we take no cut of it.',
    features: [
      'Recruitment package + study-specific marketing strategy in ~1 hour',
      'Managed digital ad campaigns run to your strategy',
      'IRB-ready in 9 days · 86% first-pass approval',
      'Smart Screener + Vision included',
    ],
    cta: 'Start with Horizon',
  },
  {
    id: 'combo',
    name: 'Horizon + Bridge',
    tagline: 'The complete recruitment engine',
    price: 'Scoped',
    unit: 'to your studies',
    priceNote: 'Study startup and community reach together, priced to your site and study count.',
    features: [
      'Everything in Horizon and Bridge',
      'Study startup plus community referral pathways',
      'One participant record across both',
      'Smart Screener + Vision included',
    ],
    cta: 'Request pricing',
    featured: true,
    badge: 'Most complete',
  },
  {
    id: 'bridge',
    name: 'Bridge',
    tagline: 'Community & referral pathways',
    price: '$1,200',
    unit: '/indication',
    priceNote: 'Per indication, across multiple sites. Built for Diversity Action Plan reach.',
    features: [
      'Partner networks matched to your indication',
      'Executes against Diversity Action Plan targets',
      'Partner-level referral and engagement reporting',
      'Smart Screener + Vision included',
    ],
    cta: 'Start with Bridge',
  },
];

/**
 * The entry tiers above are for a single study at a single site — academics,
 * individual sites, and one-off trials. Everything organizational is a custom
 * model built with the buyer, which is what this band frames.
 */
export const ENTRY_LABEL = 'For a single study at a single site: academics, individual sites and trials';

/**
 * Enterprise band, framed as a consultative custom model rather than a fixed
 * tier — that is genuinely how networks, SMOs, CROs and sponsors are priced.
 */
export const ENTERPRISE = {
  eyebrow: 'Site networks · SMOs · CROs · Sponsors',
  name: 'We build the pricing model with you.',
  desc: 'Running across many sites, studies or indications is never one-size-fits-all. We scope a flat-fee model around your portfolio: Horizon site profiles managed centrally, Bridge programs with per-site dashboards, and organization-wide Vision, so the economics fit how you actually operate.',
  models: [
    'Flat fee per site, across multiple studies',
    'Flat fee per study, across multiple sites',
    'Per-indication programs with per-site reporting',
  ],
  includes: [
    'Horizon site profiles created from the protocol, managed at org level',
    'Bridge per-site dashboards with an organization-wide view',
    'Organization-wide Vision with sponsor and monitor access',
    'Media spend passes through at cost, never marked up or taken a cut of',
    'System-of-record integration · dedicated strategist · no per-seat or setup fees',
  ],
  cta: 'Build a custom quote',
};
