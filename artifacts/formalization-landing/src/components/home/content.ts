export const LAST_UPDATED = "24 مارس 2026";

export type GovernmentPlatform = {
  name: string;
  entity: string;
  type: "معلوماتي" | "تنفيذي";
  typeLabel:
    | "دليل مرجعي"
    | "تسجيل فعلي"
    | "ترخيص فعلي"
    | "نقطة دخول موحّدة";
  description: string;
  useCase: string;
  href: string;
};

export const NAV_ITEMS = [
  { id: "benefits", label: "لماذا الترخيص" },
  { id: "find-path", label: "اختبار المسار" },
  { id: "reg-vs-license", label: "التسجيل والترخيص" },
  { id: "faq", label: "أسئلة ومخاوف" },
  { id: "survey", label: "الاستبيان" },
] as const;

export const ACTIVE_SECTION_MAP: Record<string, string> = {
  top: "top",
  benefits: "benefits",
  "find-path": "find-path",
  faq: "faq",
  "reg-vs-license": "reg-vs-license",
  "legal-forms": "reg-vs-license",
  "home-based": "reg-vs-license",
  "what-changes": "reg-vs-license",
  entities: "reg-vs-license",
  survey: "survey",
  footer: "survey",
};

export const SOURCE_FACTS = [
  // VERIFY: Could not locate exact figure in source document
  {
    value: 21.1,
    decimals: 1,
    suffix: "%",
    title: "نشاط ريادي مبكر",
    description: "بحسب التقرير الوطني لمرصد ريادة الأعمال العالمي 2024/2025 في الأردن.",
    year: "2024/2025",
    sourceLabel: "المنصة الحكومية الأردنية",
    sourceUrl:
      "https://jordan.gov.jo/Ar/NewsDetails/%D8%A7%D9%84%D8%A7%D9%82%D8%AA%D8%B5%D8%A7%D8%AF_%D8%A7%D9%84%D8%B1%D9%82%D9%85%D9%8A_%D8%AA%D8%B7%D9%84%D9%82_%D8%A7%D9%84%D8%AA%D9%82%D8%B1%D9%8A%D8%B1_%D8%A7%D9%84%D9%88%D8%B7%D9%86%D9%8A_%D9%84%D9%85%D8%B1%D8%B5%D8%AF_%D8%B1%D9%8A%D8%A7%D8%AF%D8%A9_%D8%A7%D9%84%D8%A3%D8%B9%D9%85%D8%A7%D9%84_%D8%A7%D9%84%D8%B9%D8%A7%D9%84%D9%85%D9%8A_20242025",
  },
  {
    value: 98,
    decimals: 0,
    suffix: "%",
    title: "من المنشآت صغيرة ومتناهية الصغر",
    description: "الغالبية العظمى من المنشآت في الأردن صغيرة ومتناهية الصغر — يعني مشروعك مش استثناء.",
    year: "مرجع 2016",
    sourceLabel: "البنك الأوروبي للاستثمار",
    sourceUrl:
      "https://www.eib.org/attachments/efs/economic_report_neighbourhood_sme_financing_jordan_en.pdf",
  },
  {
    value: 71,
    decimals: 0,
    suffix: "%",
    title: "من عمالة القطاع الخاص",
    description: "يشير المرجع نفسه إلى الدور الكبير لهذه المشاريع في التشغيل داخل القطاع الخاص.",
    year: "مرجع 2016",
    sourceLabel: "البنك الأوروبي للاستثمار",
    sourceUrl:
      "https://www.eib.org/attachments/efs/economic_report_neighbourhood_sme_financing_jordan_en.pdf",
  },
] as const;

export const GOVERNMENT_PLATFORMS: GovernmentPlatform[] = [
  {
    name: "دليل الخدمات — وزارة الصناعة والتجارة والتموين",
    entity: "وزارة الصناعة والتجارة والتموين",
    type: "معلوماتي",
    typeLabel: "دليل مرجعي",
    description: "يشرح المتطلبات والمستندات والرسوم لكل خدمة متعلقة بتسجيل المنشآت والأسماء التجارية.",
    useCase: "ابدأ هنا إذا أردت معرفة المتطلبات قبل البدء بأي إجراء.",
    href: "https://daleel.mit.gov.jo",
  },
  {
    name: "دائرة مراقبة الشركات — الخدمات الإلكترونية",
    entity: "دائرة مراقبة الشركات",
    type: "تنفيذي",
    typeLabel: "تسجيل فعلي",
    description: "تسجيل الشركات إلكترونياً، فتح ملفات، تعديل بيانات، واستخراج شهادات.",
    useCase: "ابدأ هنا إذا قررت تسجيل شركتك وأنت جاهز لفتح الملف.",
    href: "https://ccd.gov.jo",
  },
  {
    name: "نظام الرخص المهنية — وزارة الإدارة المحلية",
    entity: "وزارة الإدارة المحلية (البلديات)",
    type: "تنفيذي",
    typeLabel: "ترخيص فعلي",
    description: "التقديم على رخصة مهن إلكترونياً للبلديات خارج حدود أمانة عمّان.",
    useCase: "ابدأ هنا إذا كان مشروعك خارج عمّان وتحتاج رخصة مهن.",
    href: "https://eservices.mola.gov.jo",
  },
  {
    name: "أمانة عمّان الكبرى — الخدمات الإلكترونية",
    entity: "أمانة عمّان الكبرى",
    type: "تنفيذي",
    typeLabel: "ترخيص فعلي",
    description: "التقديم على رخصة مهن ومتطلبات الموقع إلكترونياً داخل حدود أمانة عمّان.",
    useCase: "ابدأ هنا إذا كان مشروعك داخل عمّان وتحتاج رخصة مهن.",
    href: "https://e-services.ammancity.gov.jo",
  },
  {
    name: "منصة سند",
    entity: "وزارة الاقتصاد الرقمي والريادة",
    type: "تنفيذي",
    typeLabel: "نقطة دخول موحّدة",
    description: "بوابة حكومية موحّدة تجمع خدمات التسجيل والجهات المرتبطة بها في مكان واحد.",
    useCase: "ابدأ هنا إذا كنت تفضّل إنجاز كل شيء من مكان واحد.",
    href: "https://sanad.gov.jo",
  },
];

export const RESEARCH_LINKS = [
  {
    label: "التقرير الوطني لمرصد ريادة الأعمال العالمي 2024/2025",
    href: "https://jordan.gov.jo/Ar/NewsDetails/%D8%A7%D9%84%D8%A7%D9%82%D8%AA%D8%B5%D8%A7%D8%AF_%D8%A7%D9%84%D8%B1%D9%82%D9%85%D9%8A_%D8%AA%D8%B7%D9%84%D9%82_%D8%A7%D9%84%D8%AA%D9%82%D8%B1%D9%8A%D8%B1_%D8%A7%D9%84%D9%88%D8%B7%D9%86%D9%8A_%D9%84%D9%85%D8%B1%D8%B5%D8%AF_%D8%B1%D9%8A%D8%A7%D8%AF%D8%A9_%D8%A7%D9%84%D8%A3%D8%B9%D9%85%D8%A7%D9%84_%D8%A7%D9%84%D8%B9%D8%A7%D9%84%D9%85%D9%8A_20242025",
  },
  {
    label: "البنك الأوروبي للاستثمار — تمويل المشاريع الصغيرة في الأردن",
    href: "https://www.eib.org/attachments/efs/economic_report_neighbourhood_sme_financing_jordan_en.pdf",
  },
] as const;
