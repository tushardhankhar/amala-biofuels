/**
 * Single source of truth for all website copy and company facts.
 * Source: "Amala Biofuels — Website Design & Content Brief" supplied by the company.
 *
 * VERIFICATION POLICY
 * -------------------
 * Every block carries a `status`:
 *   - "verified"  → confirmed in writing by Amala Biofuels. Safe to publish.
 *   - "draft"     → supplied in the brief but flagged there for confirmation before publishing.
 *   - "missing"   → not supplied yet. Hidden on the site until filled in.
 *
 * Do not add specifications, prices, certifications, client names, testimonials,
 * production figures or environmental claims unless the company has approved them.
 */

export type ContentStatus = "verified" | "draft" | "missing";

export const company = {
  legalName: "Amala Biofuels Private Limited",
  shortName: "Amala Biofuels",
  tagline: "Transforming Resources. Powering Industry.",
  positioning: "Industrial fuel solutions provider",
  established: "2022",
  locality: "Jorhat",
  region: "Assam",
  country: "IN",
  linkedin: "https://in.linkedin.com/company/amala-biofuels",
  /** The brief states this figure and asks for its basis (installed, rated, operating…) to be confirmed. */
  capacity: {
    status: "draft" as ContentStatus,
    value: "10",
    unit: "TPD",
    long: "10 tonnes per day",
    label: "Stated combined production and processing capacity",
  },
  /** The brief supplies these addresses and asks for them (and map pins) to be confirmed. */
  addresses: [
    {
      status: "draft" as ContentStatus,
      label: "Registered Office",
      lines: ["Opposite Gymkhana Club Gate, Club Road", "Jorhat, Assam 785001"],
    },
    {
      status: "draft" as ContentStatus,
      label: "Plant",
      lines: ["Gohain Handique Gaon, Lahdoigarh", "Jorhat, Assam 785700"],
    },
  ],
  contact: {
    status: "missing" as ContentStatus,
    // Add the approved details, then set status to "verified". Each one appears on the site once set.
    phone: "", // e.g. "+91 98765 43210" — enables click-to-call
    email: "", // e.g. "sales@amalabiofuels.in"
    whatsapp: "", // international format, digits only, e.g. "919876543210" — enables WhatsApp links
  },
};

export const whatsappMessage = "Hello Amala Biofuels, I would like to discuss our fuel requirements.";

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/industries", label: "Industries We Serve" },
  { href: "/why-choose-us", label: "Why Choose Us" },
  { href: "/contact", label: "Contact Us" },
] as const;

export const quoteCta = { label: "Request a Quote", href: "/contact#quote" };

export const hero = {
  eyebrow: "Renewable & Industrial Fuel Solutions",
  headline: ["Transforming Resources.", "Powering Industry."],
  body: "From biodiesel manufacturing to application-focused industrial fuels, Amala Biofuels combines manufacturing experience, in-house R&D and processing capabilities to serve the evolving energy requirements of industry.",
  primaryCta: { label: "Explore Our Products", href: "/products" },
  secondaryCta: { label: "Discuss Your Fuel Requirements", href: "/contact#quote" },
};

export const about = {
  title: "About Amala Biofuels",
  intro:
    "An industrial fuel manufacturing and processing company based in Jorhat, Assam — established in 2022 as a biodiesel plant and grown through in-house R&D into application-focused industrial fuels.",
  body: [
    "Amala Biofuels Private Limited is an industrial fuel manufacturing and processing company based in Jorhat, Assam, India. Established in 2022 as a biodiesel manufacturing plant, the company began with the conversion of suitable waste-derived oils and other lipid-based feedstocks into biodiesel.",
    "Our operations have evolved through continuous research, experimentation and in-house process development. By working with feedstocks such as used cooking oil, palm stearin, acidic oils, fatty acids and other suitable oil-based raw materials, we have developed broader capabilities in fuel processing and industrial fuel solutions.",
    "Today, Amala Biofuels focuses on meeting diverse industrial fuel requirements. Our portfolio includes biodiesel, diesel-range products, light diesel oil (LDO), light and heavy hydrocarbon fractions, furnace oil and other application-oriented fuel products, subject to product availability and applicable specifications.",
    "With a stated combined production and processing capacity of 10 tonnes per day, our facility supports our commitment to practical manufacturing, continuous improvement and responsive industrial fuel solutions. At Amala Biofuels, we recognise that different applications call for different fuel characteristics. We combine manufacturing experience, in-house R&D and an understanding of customer requirements to work towards products suited to their intended applications.",
    "From our base in Jorhat, Assam, we aim to build long-term business relationships through dependable products, responsive service and commercially practical fuel solutions.",
  ],
  evolution: [
    {
      when: "2022",
      title: "Biodiesel manufacturing",
      body: "Established as a biodiesel plant converting suitable waste-derived oils and other lipid-based feedstocks into biodiesel.",
    },
    {
      when: "Research & development",
      title: "Process development",
      body: "Continuous research, experimentation and in-house process development with feedstocks such as used cooking oil, palm stearin, acidic oils and fatty acids.",
    },
    {
      when: "Today",
      title: "Industrial fuel solutions",
      body: "A portfolio of biodiesel, diesel-range products, LDO, hydrocarbon fractions, furnace oil and application-oriented fuels.",
    },
  ],
  vision:
    "To become a trusted and recognised industrial fuel solutions company, originating from Northeast India and serving a wider industrial market through innovation, responsible resource utilisation and dependable product quality. We envision an industrial energy landscape where valuable resources are recovered and utilised more efficiently, businesses have access to practical fuel alternatives, and continuous research helps develop sustainable and commercially viable energy solutions.",
  mission: [
    { title: "Develop application-focused fuels", body: "Understand customer requirements and supply products suited to their intended applications." },
    { title: "Advance R&D", body: "Improve processes, explore suitable feedstocks and evaluate alternative industrial fuel solutions." },
    {
      title: "Use resources responsibly",
      body: "Convert suitable waste-derived and secondary raw materials into valuable products where technically, commercially and environmentally viable.",
    },
    { title: "Support product consistency", body: "Use appropriate quality-control practices and technical evaluation." },
    { title: "Build lasting partnerships", body: "Understand customer needs and deliver responsive, commercially practical solutions." },
    { title: "Grow responsibly", body: "Expand capabilities with attention to operational safety and applicable regulations." },
  ],
  values: [
    { title: "Innovation through R&D", body: "Practical research, experimentation and process improvement." },
    { title: "Quality and consistency", body: "Appropriate testing and product evaluation." },
    { title: "Customer-centred solutions", body: "Understand the intended use before recommending a product." },
    { title: "Resource efficiency", body: "Seek viable ways to recover value from suitable secondary raw materials." },
    { title: "Integrity and transparency", body: "Clear communication about products, specifications and capabilities." },
    { title: "Safety and responsibility", body: "Responsible manufacturing and compliance with applicable requirements." },
    { title: "Long-term partnerships", body: "Trust, reliable communication and mutual business value." },
  ],
};

export type Product = {
  id: string;
  name: string;
  short: string;
  body: string;
  icon: "droplet" | "fuel" | "flame" | "layers" | "layers-heavy" | "factory" | "flask";
};

export const productsIntro = [
  "Amala Biofuels manufactures and processes a range of fuel products for industrial and other defined applications. Our portfolio has evolved from biodiesel production into broader fuel processing and product development.",
  "Product suitability depends on the intended application, equipment requirements, available specifications and confirmed product availability. Contact our team to discuss your requirements and request current technical information.",
];

/** Shown under the product list. Keep until each product's grade and permitted use are confirmed. */
export const productsNote =
  "Products are supplied for industrial and other defined applications, subject to availability. None of the products listed is offered as automotive-grade diesel unless that is confirmed in writing for a specific product. Technical data sheets are shared on request once the specification is confirmed.";

export const products: Product[] = [
  {
    id: "biodiesel",
    name: "Biodiesel",
    short: "From suitable oil-based and waste-derived feedstocks.",
    body: "Produced from suitable oil-based feedstocks, including selected waste-derived oils and other lipid-based raw materials. Grade and intended use are confirmed for each enquiry.",
    icon: "droplet",
  },
  {
    id: "diesel-range",
    name: "Diesel-Range Products",
    short: "Diesel-range fuels for defined applications.",
    body: "Fuel products within a diesel-range category for defined applications. Product identity, specification and permitted end use are stated precisely for each supply.",
    icon: "fuel",
  },
  {
    id: "ldo",
    name: "Light Diesel Oil (LDO)",
    short: "For compatible burners and combustion applications.",
    body: "Industrial fuel intended for compatible burners and other suitable combustion applications, subject to the product's verified characteristics and the equipment manufacturer's requirements.",
    icon: "flame",
  },
  {
    id: "light-fractions",
    name: "Light Hydrocarbon Fractions",
    short: "Light fractions from our processing operations.",
    body: "Light fractions obtained through relevant processing operations. Properties, intended applications and handling requirements are shared following technical review.",
    icon: "layers",
  },
  {
    id: "heavy-fractions",
    name: "Heavy Hydrocarbon Fractions",
    short: "Heavier fractions for suitable industrial uses.",
    body: "Heavier fractions for defined industrial applications where suitable. Product parameters and application limits are confirmed after verification.",
    icon: "layers-heavy",
  },
  {
    id: "furnace-oil",
    name: "Furnace Oil (FO)",
    short: "For compatible furnace and heating systems.",
    body: "Industrial fuel for compatible furnace or heating systems, subject to verified specifications and equipment requirements.",
    icon: "factory",
  },
  {
    id: "specialty",
    name: "Other / Specialty Fuel Solutions",
    short: "Application-focused solutions, discussed case by case.",
    body: "Additional products or application-focused solutions may be discussed with our team based on raw material, processing capability, technical requirements and product availability.",
    icon: "flask",
  },
];

export type Industry = {
  id: string;
  name: string;
  body: string;
  photo?: "process" | "tea" | "asphalt" | "boiler" | "storage";
};

export const industriesIntro =
  "Industrial fuel requirements vary by process, burner design, operating conditions and fuel-handling systems. Amala Biofuels works with industrial customers to understand their requirements and identify products appropriate to the intended application. Final suitability must be confirmed against product specifications and equipment requirements.";

export const industries: Industry[] = [
  {
    id: "manufacturing",
    name: "Manufacturing Industries",
    body: "Fuel solutions for compatible industrial heating systems, thermal processes and other applications requiring liquid fuels.",
    photo: "process",
  },
  {
    id: "tea",
    name: "Tea Estates and Tea Processing",
    body: "Fuel products for suitable boilers, furnaces and industrial heating applications used in tea processing and associated operations.",
    photo: "tea",
  },
  {
    id: "asphalt",
    name: "Hot-Mix and Asphalt Plants",
    body: "Industrial fuel solutions for compatible aggregate dryers, burners and asphalt production equipment, subject to equipment requirements and fuel specifications.",
    photo: "asphalt",
  },
  {
    id: "boilers",
    name: "Boilers and Furnaces",
    body: "Products for suitable combustion and process-heating systems, considering relevant properties such as viscosity, calorific value, flash point and burner compatibility.",
    photo: "boiler",
  },
  {
    id: "infrastructure",
    name: "Infrastructure and Construction",
    body: "Fuel solutions for suitable construction-related and industrial operations that require dependable fuel supply and application-specific evaluation.",
    photo: "storage",
  },
  {
    id: "other",
    name: "Other Industrial Applications",
    body: "We welcome enquiries from other industrial consumers seeking suitable fuel products for their operating requirements.",
  },
];

export const industryCta =
  "Tell us about your equipment, fuel consumption, operating requirements and delivery location. Our team can discuss product availability and the information needed to assess suitability.";

export const capabilities = [
  {
    title: "Manufacturing & Processing",
    body: "Operations that began in biodiesel manufacturing and have expanded into a broader range of industrial fuel processing.",
  },
  {
    title: "In-House R&D",
    body: "Investigation of suitable feedstocks, processing approaches and practical industrial fuel solutions.",
  },
  {
    title: "Technical Evaluation",
    body: "Understanding the intended application and equipment before discussing which products may be suitable.",
  },
  {
    title: "Quality Assessment",
    body: "Appropriate quality-control practices, testing and product evaluation to support consistency.",
  },
];

export type WhyItem = { id: string; title: string; body: string; icon: "factory" | "flask" | "target" | "layers" | "gauge" | "handshake" | "map" };

export const why: WhyItem[] = [
  {
    id: "expertise",
    title: "Manufacturing and Processing Expertise",
    body: "Our operations began in biodiesel manufacturing and have expanded into a broader range of industrial fuel processing activities.",
    icon: "factory",
  },
  {
    id: "rnd",
    title: "In-House Research and Development",
    body: "Our R&D efforts support the investigation of suitable feedstocks, processing approaches and practical industrial fuel solutions.",
    icon: "flask",
  },
  {
    id: "application",
    title: "Application-Focused Product Development",
    body: "We recognise that different industrial applications need different fuel characteristics. We work to understand the application before discussing suitable products.",
    icon: "target",
  },
  {
    id: "portfolio",
    title: "A Diverse Fuel Portfolio",
    body: "Our portfolio includes biodiesel, diesel-range products, LDO, light and heavy hydrocarbon fractions, furnace oil and other products, subject to availability and applicable specifications.",
    icon: "layers",
  },
  {
    id: "capacity",
    title: "Production and Processing Capability",
    body: "Our stated combined production and processing capacity is 10 tonnes per day.",
    icon: "gauge",
  },
  {
    id: "customer",
    title: "Customer-Focused Approach",
    body: "We aim to build long-term partnerships through responsive communication, an understanding of customer requirements and commercially practical supply arrangements.",
    icon: "handshake",
  },
  {
    id: "northeast",
    title: "Northeast India Foundation",
    body: "Based in Jorhat, Assam, we bring regional manufacturing and processing capabilities to the industrial fuel market and aim to expand our reach.",
    icon: "map",
  },
];

/** The six differentiators shown on the homepage. */
export const homeWhyIds = ["expertise", "rnd", "application", "portfolio", "customer", "northeast"];

export const finalCta = {
  headline: "Looking for a fuel solution for your operation?",
  body: "Tell us about your application and requirements.",
};

export const contactPage = {
  headline: "Let's Discuss Your Fuel Requirements",
  body: "Whether you are evaluating a new fuel source or looking for a product for a specific industrial application, contact Amala Biofuels to discuss your requirements. Share your application, approximate consumption, product needs and delivery location so our team can respond with relevant information.",
  successMessage:
    "Thank you for contacting Amala Biofuels. Your enquiry has been received. Our team will review your requirements and get in touch.",
};

export const enquiryProducts = [...products.map((p) => p.name), "Not sure — need advice"] as const;
export const enquiryIndustries = [...industries.map((i) => i.name)] as const;

export const seo = {
  title: "Amala Biofuels | Industrial Fuel Manufacturer in Assam",
  description:
    "Amala Biofuels Private Limited, based in Jorhat, Assam, manufactures and processes biodiesel and industrial fuel products, supported by in-house R&D and a stated 10-tonne-per-day combined capacity.",
  keywords: [
    "Amala Biofuels",
    "industrial fuel manufacturer Assam",
    "biodiesel manufacturer Jorhat",
    "industrial fuel solutions Northeast India",
    "LDO supplier Assam",
    "furnace oil industrial applications",
    "biodiesel production Assam",
  ],
};
