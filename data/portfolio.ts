/**
 * Portfolio data — TSC Engineering
 *
 * Categories filter by WHAT TSC delivered (Fire Alarm, BMS, HVAC, etc.),
 * not by building type. One project can match multiple categories because
 * each `scope` row carries its own category tag.
 *
 * Images: drop ONE file per project at
 *   /public/media/images/portfolio/{slug}.webp
 * The slug is the filename. No folders, no manifest, no config — the
 * component reads `cover.src` and renders it at a fixed aspect ratio.
 */

export type Lang = "en" | "ka";

export type ScopeCategory =
  | "Fire Alarm"
  | "Fire Announcement"
  | "Firefighting"
  | "HVAC / Mechanical"
  | "Electrical"
  | "BMS"
  | "Maintenance & Inspection";

export const SCOPE_CATEGORIES: { key: ScopeCategory; label: { en: string; ka: string } }[] = [
  { key: "Fire Alarm",                label: { en: "Fire Alarm",                ka: "სახანძრო სიგნალიზაცია" } },
  { key: "Fire Announcement",         label: { en: "Fire Announcement",         ka: "ხანძრის შეტყობინება" } },
  { key: "Firefighting",              label: { en: "Firefighting",              ka: "ხანძარქრობა" } },
  { key: "HVAC / Mechanical",         label: { en: "HVAC / Mechanical",         ka: "HVAC / მექანიკური" } },
  { key: "Electrical",                label: { en: "Electrical",                ka: "ელექტრო სისტემები" } },
  { key: "BMS",                       label: { en: "BMS",                       ka: "BMS" } },
  { key: "Maintenance & Inspection",  label: { en: "Maintenance & Inspection",  ka: "მომსახურება და ინსპექცია" } },
];

export type ScopeItem = {
  category: ScopeCategory;
  label: { en: string; ka: string };
  yearRange: string; // e.g. "2022 – Ongoing" — same in both languages
};

export type PortfolioItem = {
  slug: string;
  title:    { en: string; ka: string };
  location: { en: string; ka: string };
  summary:  { en: string; ka: string };
  cover: {
    src: string;
    alt: string;
  };
  scope: ScopeItem[];
  featured?: boolean;
};

/* ─────────────────────────────────────────────────────────
   Helper: derive all unique categories present on an item
   (used by the filter / chip rendering)
   ───────────────────────────────────────────────────────── */
export function getItemCategories(item: PortfolioItem): ScopeCategory[] {
  return Array.from(new Set(item.scope.map((s) => s.category)));
}

/* ─────────────────────────────────────────────────────────
   Projects
   ───────────────────────────────────────────────────────── */

export const portfolioItems: PortfolioItem[] = [
  // ════════════════════════════════════════════════════════
  // 1. RADISSON BLU IVERIA — flagship, featured in hero
  // ════════════════════════════════════════════════════════
  {
    slug: "radisson-blu-iveria",
    title:    { en: "Radisson Blu Iveria Hotel",          ka: "რედისონ ბლუ ივერია" },
    location: { en: "Tbilisi, Georgia",                    ka: "თბილისი, საქართველო" },
    summary: {
      en: "Full fire safety stack with ongoing transformer and boiler maintenance for one of Tbilisi's landmark hotels.",
      ka: "სრული სახანძრო უსაფრთხოების სისტემა და ტრანსფორმატორის და ქვაბის მუდმივი მომსახურება — თბილისის ერთ-ერთი მთავარი სასტუმროსთვის.",
    },
    cover: {
      src: "/media/images/portfolio/radisson-blu-iveria.webp",
      alt: "Radisson Blu Iveria Hotel, Tbilisi",
    },
    scope: [
      { category: "Fire Alarm",               label: { en: "Fire Alarm System",                                ka: "სახანძრო სიგნალიზაცია" },              yearRange: "2022 – Ongoing" },
      { category: "Fire Announcement",        label: { en: "Fire Announcement System",                         ka: "ხანძრის შეტყობინების სისტემა" },        yearRange: "2022 – Ongoing" },
      { category: "Maintenance & Inspection", label: { en: "Transformer Inspection / Maintenance Works",       ka: "ტრანსფორმატორის ინსპექცია / მომსახურება" }, yearRange: "2024 – Ongoing" },
      { category: "Maintenance & Inspection", label: { en: "Boiler Inspection / Maintenance Works",            ka: "ქვაბის ინსპექცია / მომსახურება" },         yearRange: "2025 – Ongoing" },
    ],
    featured: true,
  },

  // ════════════════════════════════════════════════════════
  // 2. CASINO IVERIA
  // ════════════════════════════════════════════════════════
  {
    slug: "casino-iveria",
    title:    { en: "Casino Iveria",          ka: "კაზინო ივერია" },
    location: { en: "Tbilisi, Georgia",        ka: "თბილისი, საქართველო" },
    summary: {
      en: "Fire alarm and announcement systems for a high-traffic gaming venue, designed for rapid evacuation reliability.",
      ka: "სახანძრო სიგნალიზაცია და შეტყობინების სისტემა მაღალი დატვირთვის ობიექტისთვის — სწრაფი და უსაფრთხო ევაკუაციის გარანტიით.",
    },
    cover: {
      src: "/media/images/portfolio/casino-iveria.webp",
      alt: "Casino Iveria, Tbilisi",
    },
    scope: [
      { category: "Fire Alarm",        label: { en: "Fire Alarm System",        ka: "სახანძრო სიგნალიზაცია" },        yearRange: "2022 – Ongoing" },
      { category: "Fire Announcement", label: { en: "Fire Announcement System", ka: "ხანძრის შეტყობინების სისტემა" }, yearRange: "2022 – Ongoing" },
    ],
    featured: false,
  },

  // ════════════════════════════════════════════════════════
  // 3. BATUMI TOWER — featured
  // ════════════════════════════════════════════════════════
  {
    slug: "batumi-tower",
    title:    { en: "Batumi Tower",      ka: "ბათუმი ტაუერი" },
    location: { en: "Batumi, Georgia",    ka: "ბათუმი, საქართველო" },
    summary: {
      en: "Full fire safety stack plus boiler service for one of the Black Sea coast's most recognizable high-rise developments.",
      ka: "სრული სახანძრო უსაფრთხოების სისტემა და ქვაბის მომსახურება — შავი ზღვის სანაპიროზე ერთ-ერთი ყველაზე ცნობადი მაღალსართულიანი ობიექტისთვის.",
    },
    cover: {
      src: "/media/images/portfolio/batumi-tower.webp",
      alt: "Batumi Tower",
    },
    scope: [
      { category: "Fire Alarm",               label: { en: "Fire Alarm System",        ka: "სახანძრო სიგნალიზაცია" },        yearRange: "2026 – Ongoing" },
      { category: "Fire Announcement",        label: { en: "Fire Announcement System", ka: "ხანძრის შეტყობინების სისტემა" }, yearRange: "2026 – Ongoing" },
      { category: "Firefighting",             label: { en: "Firefighting System",      ka: "ხანძარქრობის სისტემა" },         yearRange: "2026 – Ongoing" },
      { category: "Maintenance & Inspection", label: { en: "Boiler Service",           ka: "ქვაბის მომსახურება" },           yearRange: "2026 – Ongoing" },
    ],
    featured: true,
  },

  // ════════════════════════════════════════════════════════
  // 4. TSINANDALI ESTATE (Radisson Collection)
  // ════════════════════════════════════════════════════════
  {
    slug: "tsinandali-estate",
    title:    { en: "Tsinandali Estate — Radisson Collection Hotel", ka: "წინანდლის ესტეიტი — Radisson Collection" },
    location: { en: "Tsinandali, Kakheti",     ka: "წინანდალი, კახეთი" },
    summary: {
      en: "Ongoing fire pump and firefighting system maintenance for a heritage-grade resort property.",
      ka: "ხანძარქრობის სისტემისა და სახანძრო ტუმბოს მუდმივი მომსახურება — კულტურულ-ისტორიული მნიშვნელობის ობიექტისთვის.",
    },
    cover: {
      src: "/media/images/portfolio/tsinandali-estate.webp",
      alt: "Tsinandali Estate, Radisson Collection Hotel",
    },
    scope: [
      { category: "Firefighting",              label: { en: "Firefighting System / Fire Pump Maintenance", ka: "ხანძარქრობის სისტემა / სახანძრო ტუმბოს მომსახურება" }, yearRange: "2024 – Ongoing" },
      { category: "Maintenance & Inspection",  label: { en: "Firefighting System / Fire Pump Maintenance", ka: "ხანძარქრობის სისტემა / სახანძრო ტუმბოს მომსახურება" }, yearRange: "2024 – Ongoing" },
    ],
    featured: true,
  },

  // ════════════════════════════════════════════════════════
  // 4. CENTR PLAZA (Melik Azaryants House)
  // ════════════════════════════════════════════════════════
  {
    slug: "centr-plaza",
    title:    { en: "Centr Plaza — Melik Azaryants House", ka: "ცენტრ პლაზა — მელიქ აზარიანცის სახლი" },
    location: { en: "Tbilisi, Georgia",                     ka: "თბილისი, საქართველო" },
    summary: {
      en: "Fire alarm system for a restored historical building in central Tbilisi.",
      ka: "სახანძრო სიგნალიზაცია აღდგენილი ისტორიული ნაგებობისთვის თბილისის ცენტრში.",
    },
    cover: {
      src: "/media/images/portfolio/centr-plaza.webp",
      alt: "Centr Plaza (Melik Azaryants House), Tbilisi",
    },
    scope: [
      { category: "Fire Alarm", label: { en: "Fire Alarm System", ka: "სახანძრო სიგნალიზაცია" }, yearRange: "2024 – Ongoing" },
    ],
    featured: false,
  },

  // ════════════════════════════════════════════════════════
  // 5. REPUBLIC 24
  // ════════════════════════════════════════════════════════
  {
    slug: "republic-24",
    title:    { en: "Republic 24",          ka: "რესპუბლიკა 24" },
    location: { en: "Tbilisi, Georgia",      ka: "თბილისი, საქართველო" },
    summary: {
      en: "Fire alarm system installation and ongoing service for a mixed-use commercial development.",
      ka: "სახანძრო სიგნალიზაციის მონტაჟი და მუდმივი მომსახურება მრავალფუნქციური კომერციული ობიექტისთვის.",
    },
    cover: {
      src: "/media/images/portfolio/republic-24.webp",
      alt: "Republic 24, Tbilisi",
    },
    scope: [
      { category: "Fire Alarm", label: { en: "Fire Alarm System", ka: "სახანძრო სიგნალიზაცია" }, yearRange: "2024 – Ongoing" },
    ],
    featured: false,
  },

  // ════════════════════════════════════════════════════════
  // 6. TBILISI GERMAN INTERNATIONAL SCHOOL
  // ════════════════════════════════════════════════════════
  {
    slug: "tbilisi-german-school",
    title:    { en: "Tbilisi German International School", ka: "თბილისის გერმანული საერთაშორისო სკოლა" },
    location: { en: "Tbilisi, Georgia",                     ka: "თბილისი, საქართველო" },
    summary: {
      en: "End-to-end MEP delivery for an active educational campus — fire, mechanical, and electrical systems integrated under one scope.",
      ka: "სრული MEP გადაწყვეტა მოქმედი საგანმანათლებლო კამპუსისთვის — სახანძრო, მექანიკური და ელექტრო სისტემები ერთ კოორდინირებულ პროექტში.",
    },
    cover: {
      src: "/media/images/portfolio/tbilisi-german-school.webp",
      alt: "Tbilisi German International School",
    },
    scope: [
      { category: "Fire Alarm",         label: { en: "Fire Alarm System",                                                   ka: "სახანძრო სიგნალიზაცია" },                                              yearRange: "2024 – Ongoing" },
      { category: "Fire Announcement",  label: { en: "Fire Announcement System",                                            ka: "ხანძრის შეტყობინების სისტემა" },                                       yearRange: "2024 – Ongoing" },
      { category: "Firefighting",       label: { en: "Firefighting System",                                                 ka: "ხანძარქრობის სისტემა" },                                               yearRange: "2024 – Ongoing" },
      { category: "HVAC / Mechanical",  label: { en: "Mechanical Systems (AHU / Chiller / HVAC Installation & Service)",    ka: "მექანიკური სისტემები (AHU / Chiller / HVAC მონტაჟი და მომსახურება)" }, yearRange: "2024 – Ongoing" },
      { category: "Electrical",         label: { en: "Electrical Systems",                                                  ka: "ელექტრო სისტემები" },                                                  yearRange: "2024 – Ongoing" },
    ],
    featured: false,
  },

  // ════════════════════════════════════════════════════════
  // 7. BATUMI MALL — flagship
  // ════════════════════════════════════════════════════════
  {
    slug: "batumi-mall",
    title:    { en: "Batumi Mall",      ka: "ბათუმი მოლი" },
    location: { en: "Batumi, Georgia",   ka: "ბათუმი, საქართველო" },
    summary: {
      en: "Full MEP scope plus building management integration for one of the Black Sea coast's largest retail destinations.",
      ka: "სრული MEP გადაწყვეტა და შენობის მართვის სისტემის ინტეგრაცია — შავი ზღვის სანაპიროზე უმსხვილესი სავაჭრო ცენტრისთვის.",
    },
    cover: {
      src: "/media/images/portfolio/batumi-mall.webp",
      alt: "Batumi Mall",
    },
    scope: [
      { category: "Fire Alarm",         label: { en: "Fire Alarm System",                                                          ka: "სახანძრო სიგნალიზაცია" },                                                       yearRange: "2021 – Ongoing" },
      { category: "Fire Announcement",  label: { en: "Fire Announcement System",                                                   ka: "ხანძრის შეტყობინების სისტემა" },                                                yearRange: "2021 – Ongoing" },
      { category: "Firefighting",       label: { en: "Firefighting System",                                                        ka: "ხანძარქრობის სისტემა" },                                                        yearRange: "2021 – Ongoing" },
      { category: "HVAC / Mechanical",  label: { en: "Mechanical Systems (AHU / Chiller / VRF / HVAC Installation & Service)",     ka: "მექანიკური სისტემები (AHU / Chiller / VRF / HVAC მონტაჟი და მომსახურება)" },    yearRange: "2021 – Ongoing" },
      { category: "Electrical",         label: { en: "Electrical Systems",                                                         ka: "ელექტრო სისტემები" },                                                           yearRange: "2021 – Ongoing" },
      { category: "BMS",                label: { en: "Building Management System (BMS)",                                           ka: "შენობის მართვის სისტემა (BMS)" },                                               yearRange: "2023 – Ongoing" },
    ],
    featured: true,
  },
];