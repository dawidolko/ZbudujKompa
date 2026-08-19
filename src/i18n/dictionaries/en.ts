/**
 * English dictionary.
 *
 * This file is the shape the Polish dictionary is checked against: `pl.ts` is
 * typed as `Dictionary`, so a key added here and forgotten there is a build
 * error rather than a string that silently falls back to English at runtime.
 */
export const en = {
  meta: {
    siteTitle: 'ZbudujKompa — build your PC with confidence',
    siteDescription:
      'Step-by-step PC building guides, AMD and Intel platform comparisons, cooling advice and reference builds. Plain explanations, no marketing.',
    keywords: [
      'PC building',
      'build a computer',
      'AMD AM5',
      'Intel LGA1851',
      'CPU cooling',
      'gaming PC build',
      'PC parts compatibility',
    ],
  },

  nav: {
    skipToContent: 'Skip to main content',
    mainNavigation: 'Main navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    breadcrumb: 'Breadcrumb',
    home: 'Home',
    footerNavigation: 'Footer navigation',
    backToTop: 'Back to top',
    onThisPage: 'On this page',
  },

  theme: {
    toDark: 'Switch to dark mode',
    toLight: 'Switch to light mode',
  },

  language: {
    label: 'Language',
    switchTo: (name: string) => `Switch language to ${name}`,
  },

  home: {
    heroEyebrow: 'PC building, explained properly',
    heroTitle: 'Build your PC without guessing',
    heroLead:
      'Which socket, which cooler, which power supply — answered with the reasoning behind each choice, so you can decide for yourself rather than take our word for it.',
    heroPrimary: 'Start with the assembly guide',
    heroSecondary: 'Compare platforms',
    statsSockets: 'platforms covered',
    statsGuides: 'guides',
    statsBuilds: 'reference builds',
    platformsTitle: 'Choose your platform',
    platformsLead:
      'The socket decides your chipset, memory generation and cooler mounting. It is the first real decision in any build.',
    coolingTitle: 'Air or liquid',
    coolingLead:
      'The honest comparison: what each class of cooler actually handles, what it costs and what it asks of you in return.',
    buildsTitle: 'Reference builds',
    buildsLead:
      'Complete part lists at four budgets, each with the reasoning for every component and an indicative price.',
    guidesTitle: 'Guides',
    guidesLead: 'From your first screw to diagnosing a machine that will not start.',
    faqTitle: 'Common questions',
    opinionsTitle: 'What builders say',
    opinionsLead:
      'Collected from public forums, each with its source and the date it was gathered so you can check the original.',
    finishedCaption: 'The end result: a machine you assembled and understand.',
  },

  platform: {
    title: 'Platforms',
    lead: 'AMD and Intel sockets compared, with an honest verdict on which are still worth buying into.',
    socket: 'Socket',
    vendor: 'Vendor',
    launched: 'Launched',
    supportedUntil: 'Support through',
    memory: 'Memory',
    pcie: 'PCIe',
    coolerMount: 'Cooler mount',
    chipsets: 'Chipsets',
    chipset: 'Chipset',
    overclocking: 'Overclocking',
    tier: 'Tier',
    verdict: 'Verdict',
    status: 'Status',
    statusCurrent: 'Current',
    statusMature: 'Mature',
    statusLegacy: 'Retired',
    ocFull: 'CPU and memory',
    ocMemory: 'Memory only',
    ocNone: 'None',
    tierFlagship: 'Flagship',
    tierMainstream: 'Mainstream',
    tierBudget: 'Budget',
    compareAll: 'Compare all platforms',
    relatedBuilds: 'Builds on this platform',
  },

  cooling: {
    title: 'Cooling',
    lead: 'What each class of cooler genuinely handles — in watts, in decibels and in złoty.',
    type: 'Type',
    typeAir: 'Air',
    typeAio: 'AiO liquid',
    typeCustom: 'Custom loop',
    wattage: 'Heat handled',
    noise: 'Noise under load',
    price: 'Typical price',
    pros: 'Strengths',
    cons: 'Trade-offs',
    bestFor: 'Best for',
    allTypes: 'All cooling types',
  },

  builds: {
    title: 'Reference builds',
    lead: 'Complete part lists with the reasoning behind each choice and an indicative total.',
    useCase: 'Intended use',
    expectation: 'What to expect',
    parts: 'Parts list',
    part: 'Part',
    component: 'Component',
    price: 'Indicative price',
    why: 'Why this part',
    difficulty: 'Assembly difficulty',
    difficultyBeginner: 'Beginner',
    difficultyIntermediate: 'Intermediate',
    difficultyAdvanced: 'Advanced',
    kind: {
      cpu: 'Processor',
      motherboard: 'Motherboard',
      ram: 'Memory',
      gpu: 'Graphics card',
      storage: 'Storage',
      psu: 'Power supply',
      case: 'Case',
      cooler: 'CPU cooler',
    },
  },

  guides: {
    title: 'Guides',
    lead: 'Step-by-step instructions written for someone doing this for the first time.',
    readingTime: (minutes: number) => `${minutes} min read`,
    updated: (date: string) => `Updated ${date}`,
    difficulty: 'Difficulty',
    steps: 'Steps',
    step: 'Step',
    stepOf: (current: number, total: number) => `Step ${current} of ${total}`,
    minutes: (value: number) => `${value} min`,
    toolsNeeded: 'Tools needed',
    warning: 'Important',
    related: 'Related guides',
    allGuides: 'All guides',
    category: {
      basics: 'Basics',
      assembly: 'Assembly',
      cooling: 'Cooling',
      platform: 'Platforms',
      software: 'Software',
      troubleshooting: 'Troubleshooting',
      optimisation: 'Optimisation',
    },
    downloadChecklist: 'Download the checklist',
    downloadChecklistHint: 'A printable summary of every step, generated in your browser.',
  },

  tools: {
    title: 'Tools',
    compatibility: {
      title: 'Compatibility checker',
      lead: 'Pick a socket, a cooler and a memory type. The checker reports what fits and, more usefully, what does not.',
      selectSocket: 'Socket',
      selectCooling: 'Cooling',
      selectMemory: 'Memory',
      cpuWattage: 'CPU power draw (W)',
      check: 'Check compatibility',
      resultTitle: 'Result',
      compatible: 'These parts work together',
      incompatible: 'These parts do not work together',
      warningsTitle: 'Worth knowing',
      noSelection: 'Choose the options above to see the result.',
    },
    psu: {
      title: 'Power supply calculator',
      lead: 'Enter the power draw of your CPU and graphics card. The result includes the headroom a supply actually needs.',
      cpuWatts: 'CPU power draw (W)',
      gpuWatts: 'Graphics card power draw (W)',
      otherWatts: 'Other components (W)',
      calculate: 'Calculate',
      estimated: 'Estimated draw',
      recommended: 'Recommended supply',
      explanation:
        'The recommendation adds 30 per cent on top of the estimated draw. That margin is not spare capacity for more parts — it keeps the supply near its efficiency peak and absorbs the brief spikes modern graphics cards produce.',
    },
  },

  glossary: {
    title: 'Glossary',
    lead: 'Terms you will meet while building, explained in the sense you will meet them.',
    searchLabel: 'Search terms',
    searchPlaceholder: 'Type a term…',
    noResults: 'No term matches that search.',
    resultCount: (count: number) => (count === 1 ? '1 term' : `${count} terms`),
  },

  faq: {
    title: 'Frequently asked questions',
    lead: 'The questions that come up most often, answered without hedging.',
  },

  opinions: {
    title: 'Community opinions',
    source: 'Source',
    collectedOn: (date: string) => `Collected on ${date}`,
    rating: (value: number) => `Rated ${value} out of 5`,
    disclaimer:
      'These are individual opinions collected from public forums, quoted with their source and collection date. They are not verified reviews and are not affiliated with any manufacturer.',
  },

  chat: {
    title: 'Build assistant',
    open: 'Open the build assistant',
    close: 'Close the build assistant',
    placeholder: 'Ask about sockets, cooling, memory…',
    send: 'Send',
    greeting:
      'Hello. Ask me about sockets, cooling, memory or power supplies and I will point you at the right page.',
    suggestions: 'Try asking',
    noAnswer:
      'I do not have a good answer for that. Try the guides or the glossary — they cover more ground than I do.',
    sourcesLabel: 'Read more',
    thinking: 'Looking that up…',
    conversation: 'Conversation with the build assistant',
    youLabel: 'You',
    botLabel: 'Assistant',
    reset: 'Clear conversation',
    offlineNote: 'Answers come from this site content, not from a live service.',
  },

  configurator: {
    title: 'Build configurator',
    lead: 'Pick your parts and see immediately what fits, what does not, and why. Every check explains its reasoning rather than just passing or failing.',
    summary: 'Summary',
    empty:
      'Choose a component to start. The processor is the natural first step — it fixes the socket, and the socket decides the board.',
    notChosen: 'Not chosen',
    choose: 'Choose',
    change: 'Change',
    clear: 'Clear',
    reset: 'Start over',
    allTiers: 'All',
    noneInTier: 'No components in this price range.',
    estimatedPrice: 'Estimated total',
    powerDraw: 'Power draw',
    suggestedPsu: 'Suggested PSU',
    compatible: 'These parts work together',
    incompatible: 'These parts do not work together',
    problems: 'Problems',
    worthKnowing: 'Worth knowing',
    checksPassed: 'Checks passed',
    priceNote:
      'Prices are indicative bands for budgeting, not a live feed. Hardware pricing moves weekly, so verify before buying.',
    comparison: 'Compare',
    presets: 'Start from a reference build',
    presetsLead:
      'Load a complete configuration and adjust it, rather than starting from an empty list.',
    loadPreset: 'Load',
    category: {
      cpu: 'Processor',
      motherboard: 'Motherboard',
      ram: 'Memory',
      gpu: 'Graphics card',
      storage: 'Storage',
      psu: 'Power supply',
      case: 'Case',
      cooler: 'CPU cooler',
    },
    tier: {
      budget: 'Budget',
      value: 'Value',
      midrange: 'Mid-range',
      high: 'High-end',
      flagship: 'Flagship',
    },
  },

  parts: {
    title: 'Component browser',
    lead: 'Every component in the catalogue, filterable by category and price range, with the specifications that actually decide a build.',
    filterCategory: 'Category',
    filterTier: 'Price range',
    filterBrand: 'Brand',
    all: 'All',
    resultCount: (count: number) => (count === 1 ? '1 component' : `${count} components`),
    noResults: 'No component matches these filters.',
    sortBy: 'Sort by',
    sortName: 'Name',
    sortPriceAsc: 'Price, lowest first',
    sortPriceDesc: 'Price, highest first',
    compare: 'Comparison',
    performance: 'Relative performance',
  },

  sitemap: {
    title: 'Site map',
    lead: 'Every page on this site in one place, grouped the way the navigation groups them.',
    other: 'About and information',
  },

  resources: {
    title: 'Sources and links',
    lead: 'Official manufacturer documentation, support tools and independent testing — the primary sources behind the guides on this site.',
    official: 'Official',
    independent: 'Independent',
    disclaimer:
      'None of these links are affiliate links and this site earns nothing from them. Manufacturer pages are listed because their specifications are authoritative; independent outlets because they publish their testing methodology. Links do rot — if one is dead, please report it.',
    category: {
      cpu: 'Processors',
      motherboard: 'Motherboards',
      memory: 'Memory',
      gpu: 'Graphics cards',
      cooling: 'Cooling',
      psu: 'Power supplies',
      case: 'Cases',
      storage: 'Storage',
      os: 'Operating systems',
      tools: 'Diagnostic tools',
      testing: 'Independent testing',
    },
  },

  about: {
    title: 'About this site',
    lead: 'What this is, who made it and how it is built.',
  },

  contact: {
    title: 'Contact',
    lead: 'Spotted a mistake or want to suggest a topic? Please get in touch.',
    emailLabel: 'Email',
    repositoryLabel: 'Source code',
    repositoryText: 'This site is open source. Corrections are welcome as issues or pull requests.',
  },

  accessibility: {
    title: 'Accessibility',
    lead: 'What this site does to stay usable for everyone, and where it falls short.',
  },

  common: {
    readMore: 'Read more',
    learnMore: 'Learn more',
    viewAll: 'View all',
    backTo: (target: string) => `Back to ${target}`,
    from: 'from',
    to: 'to',
    of: 'of',
    close: 'Close',
    loading: 'Loading…',
    externalLink: 'Opens in a new tab',
    lastUpdated: 'Last updated',
    notFoundTitle: 'Page not found',
    notFoundLead: 'This page does not exist. It may have been moved or renamed.',
    notFoundAction: 'Go to the home page',
  },
};

/**
 * The dictionary shape.
 *
 * Deliberately not `typeof en` on an `as const` object: that would widen every
 * value into a string *literal* type, and the Polish file — which holds
 * different strings by definition — could never satisfy it. Mapping the
 * literals back to their base types keeps the structural check (every key must
 * exist, functions must keep their signatures) while allowing the values to
 * differ, which is exactly the guarantee a translation file needs.
 */
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer Item)[]
    ? Widen<Item>[]
    : // Functions are kept as-is so a translated label builder still has to
      // accept the same arguments as the English one.
      T extends (...args: infer Args) => infer Return
      ? (...args: Args) => Return
      : { -readonly [Key in keyof T]: Widen<T[Key]> };

export type Dictionary = Widen<typeof en>;
