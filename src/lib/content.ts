// Site content. Demo copy — review with the firm and update before launch (see README).

export type PracticeArea = {
  slug: string;
  title: string;
  short: string;
  icon: IconName;
  intro: string;
  services: string[];
  whyUs: string[];
  faqs: { q: string; a: string }[];
  keywords: string[];
};

export type IconName = "scales" | "briefcase" | "home" | "heart" | "badge" | "globe" | "passport";

export const practiceAreas: PracticeArea[] = [
  {
    slug: "international-trade-investment",
    title: "International Trade & Investment Law",
    short: "Investment structuring, bilateral investment treaties, trade regulation and investor–state advisory across Africa.",
    icon: "globe",
    intro:
      "Led by our founding partner, an International Economic Law and Investment Law consultant, we advise governments, investors and enterprises on the legal frameworks that govern cross-border trade and investment into Kenya and the wider African continent.",
    services: [
      "Foreign direct investment structuring and market entry",
      "Bilateral investment treaties and investor protections",
      "Investor–state dispute prevention and advisory",
      "EAC, COMESA and AfCFTA trade regulation",
      "Public–private partnerships and concession agreements",
      "Policy and legislative advisory on investment law",
    ],
    whyUs: [
      "Doctoral-level expertise in international economic and investment law",
      "Practical understanding of how treaty protections apply on the ground in East Africa",
      "Advice that connects regulatory, commercial and dispute risk",
    ],
    faqs: [
      {
        q: "What protections do foreign investors have in Kenya?",
        a: "Protections come from the Constitution, the Investment Promotion Act, sector legislation and Kenya's bilateral investment treaties, which may provide guarantees such as fair and equitable treatment and protection against unlawful expropriation. The position depends on the investor's home state and structure.",
      },
      {
        q: "How does the AfCFTA affect businesses trading from Kenya?",
        a: "The African Continental Free Trade Area progressively reduces tariffs and non-tariff barriers between member states. Businesses must meet rules-of-origin requirements to benefit, which we help structure and document.",
      },
    ],
    keywords: ["investment lawyer Kenya", "international trade law Nairobi", "bilateral investment treaty advice Africa"],
  },
  {
    slug: "litigation-dispute-resolution",
    title: "Litigation & Dispute Resolution",
    short: "Civil and commercial litigation, arbitration and mediation before Kenyan courts and regional tribunals.",
    icon: "scales",
    intro:
      "When a dispute cannot be resolved at the table, you need advocates who prepare every matter as though it will go to full hearing. We represent clients before the High Court, the Court of Appeal, the Supreme Court, the Environment and Land Court and arbitral tribunals across East Africa.",
    services: [
      "Commercial and contractual disputes",
      "Debt recovery and insolvency proceedings",
      "Judicial review and constitutional petitions",
      "Domestic and international arbitration",
      "Court-annexed mediation and negotiated settlements",
      "Enforcement of judgments and arbitral awards",
    ],
    whyUs: [
      "Early case assessment with a candid view of risk, cost and timelines",
      "Partner-led advocacy from first instruction to judgment",
      "Experience before regional tribunals, including the East African Court of Justice",
    ],
    faqs: [
      {
        q: "How long does a civil case take in Kenya?",
        a: "Timelines vary by court and complexity. Commercial matters in the High Court commonly run 12–36 months; mediation and arbitration can conclude far sooner. We give you a realistic estimate at the first consultation.",
      },
      {
        q: "Can my dispute be resolved without going to court?",
        a: "Often, yes. Many contracts contain arbitration clauses, and Kenyan courts actively refer suitable matters to court-annexed mediation. We always assess whether an out-of-court route better serves your interests.",
      },
    ],
    keywords: ["litigation lawyer Nairobi", "commercial dispute advocate Kenya", "arbitration Kenya"],
  },
  {
    slug: "corporate-commercial",
    title: "Corporate & Commercial",
    short: "Company formation, mergers and acquisitions, contracts, compliance and cross-border transactions.",
    icon: "briefcase",
    intro:
      "We advise founders, family businesses, investors and multinational groups on the full life cycle of an enterprise in East Africa — from incorporation and governance to financing, acquisitions and exit.",
    services: [
      "Company incorporation and restructuring",
      "Mergers, acquisitions and due diligence",
      "Shareholder and joint venture agreements",
      "Commercial contracts and distribution agreements",
      "Regulatory compliance, including the Data Protection Act, 2019",
      "Competition Authority of Kenya filings",
    ],
    whyUs: [
      "Advocates admitted in Kenya and Uganda for cross-border transactions",
      "Commercially grounded advice, delivered on your deal timetable",
      "Fixed-fee options for defined transactional work",
    ],
    faqs: [
      {
        q: "How long does it take to register a company in Kenya?",
        a: "Through the eCitizen Business Registration Service, a private limited company can typically be registered within 3–7 working days once name reservation and documents are in order.",
      },
      {
        q: "Do foreign investors need a local partner in Kenya?",
        a: "Most sectors permit full foreign ownership, but some — including certain insurance, telecommunications and mining activities — carry local-ownership requirements. We confirm the position for your sector before you invest.",
      },
    ],
    keywords: ["corporate lawyer Nairobi", "company registration Kenya", "M&A advocate Kenya"],
  },
  {
    slug: "real-estate-conveyancing",
    title: "Real Estate & Conveyancing",
    short: "Land transactions, title verification, lease agreements and property dispute resolution.",
    icon: "home",
    intro:
      "Property is often the most significant asset a family or business holds. We protect it with rigorous due diligence, carefully drafted agreements and decisive action when title is challenged.",
    services: [
      "Sale and purchase of land and property",
      "Title searches and due diligence",
      "Commercial and residential leases",
      "Charges, discharges and property financing",
      "Sectional properties and off-plan purchases",
      "Land disputes before the Environment and Land Court",
    ],
    whyUs: [
      "Thorough searches with the Ministry of Lands and county authorities to guard against fraud",
      "Clear, staged fee quotations based on the Advocates Remuneration Order",
      "Experience with the Ardhisasa digital land registry",
    ],
    faqs: [
      {
        q: "How do I verify a title deed before buying land in Kenya?",
        a: "An official search at the relevant land registry (increasingly through Ardhisasa) confirms the registered owner and any encumbrances. We also recommend a survey, county rates clearance and physical site visit before any deposit is paid.",
      },
      {
        q: "What are the costs of conveyancing in Kenya?",
        a: "Buyers typically pay stamp duty (4% in municipalities, 2% in rural areas), registration fees and legal fees guided by the Advocates Remuneration Order. We provide a full written estimate before you commit.",
      },
    ],
    keywords: ["conveyancing lawyer Nairobi", "land title verification Kenya", "property lawyer Kenya"],
  },
  {
    slug: "family-succession",
    title: "Family & Succession",
    short: "Divorce, custody, adoption, wills, trusts and estate administration handled with discretion.",
    icon: "heart",
    intro:
      "Family matters require legal skill and personal discretion in equal measure. We guide clients through separation, children's matters and the administration of estates with care, confidentiality and clear advice.",
    services: [
      "Divorce and matrimonial property",
      "Child custody, access and maintenance",
      "Adoption and guardianship",
      "Wills, trusts and estate planning",
      "Grants of probate and letters of administration",
      "Succession disputes",
    ],
    whyUs: [
      "Strict confidentiality from first contact",
      "Preference for negotiated outcomes that protect children and relationships",
      "Estate plans structured to reduce future disputes among beneficiaries",
    ],
    faqs: [
      {
        q: "What happens if someone dies without a will in Kenya?",
        a: "Their estate is distributed under the intestacy rules of the Law of Succession Act. An administrator must first obtain letters of administration from the court before any assets are transferred.",
      },
      {
        q: "Is a handwritten will valid in Kenya?",
        a: "It can be, provided it is signed by the testator and attested by two competent witnesses. We recommend a professionally drafted will to avoid challenges later.",
      },
    ],
    keywords: ["family lawyer Nairobi", "succession lawyer Kenya", "divorce advocate Kenya"],
  },
  {
    slug: "employment-labour",
    title: "Employment & Labour",
    short: "Workplace policy, contracts, terminations and representation before the Employment and Labour Relations Court.",
    icon: "badge",
    intro:
      "We advise employers on building compliant, defensible workplaces, and represent both employers and employees when disputes reach the Employment and Labour Relations Court.",
    services: [
      "Employment contracts and HR policies",
      "Disciplinary processes and fair termination",
      "Redundancy and restructuring",
      "Unfair dismissal claims",
      "Collective bargaining and trade union relations",
      "Workplace investigations",
    ],
    whyUs: [
      "Practical guidance that aligns with the Employment Act, 2007",
      "Rapid-response support when a workplace issue escalates",
      "Training for HR teams and line managers",
    ],
    faqs: [
      {
        q: "What notice is required to terminate employment in Kenya?",
        a: "The Employment Act sets minimum notice periods — commonly 28 days for employees paid monthly — and requires a valid reason and fair procedure. Contracts may provide for longer notice.",
      },
      {
        q: "How long do I have to file an unfair dismissal claim?",
        a: "Claims before the Employment and Labour Relations Court should generally be filed within three years of the cause of action. Acting early preserves evidence and options.",
      },
    ],
    keywords: ["employment lawyer Nairobi", "unfair dismissal Kenya", "labour law advocate"],
  },
  {
    slug: "immigration-regulatory",
    title: "Immigration & Regulatory",
    short: "Work permits, investor licensing and regulatory compliance for foreign nationals and enterprises.",
    icon: "passport",
    intro:
      "We help individuals and companies relocate talent to Kenya, secure the right permits and licences, and remain compliant with sector regulators.",
    services: [
      "Work permits and special passes",
      "Dependant passes and permanent residence",
      "Investor and business permits",
      "Sector licensing and regulatory approvals",
      "Regulatory investigations and enforcement",
      "Citizenship applications",
    ],
    whyUs: [
      "End-to-end handling of applications through the eFNS portal",
      "Clear document checklists and realistic processing timelines",
      "Ongoing compliance support after approval",
    ],
    faqs: [
      {
        q: "Which work permit do I need to work in Kenya?",
        a: "Most employees need a Class D permit; investors typically apply under Class G, and professionals under Class K or others depending on their circumstances. We confirm the right class before you apply.",
      },
    ],
    keywords: ["immigration lawyer Kenya", "Kenya work permit", "Class D permit Kenya"],
  },
];

export type Advocate = {
  slug: string;
  name: string;
  role: string;
  focus: string;
  credentials: string;
  bio: string[];
  education: string[];
  admissions: string[];
  practiceSlugs: string[];
  email: string;
};

export const advocates: Advocate[] = [
  {
    slug: "dr-christopher-kenyariri",
    name: "Dr. Christopher O. Kenyariri",
    role: "Founding Partner",
    focus: "International Economic & Investment Law",
    credentials: "LL.D (University of South Africa, Pretoria)",
    bio: [
      "Dr. Christopher O. Kenyariri is the founding partner of DRCO Kenyariri Advocates LLP. He holds a Doctor of Laws (LL.D) from the University of South Africa, Pretoria, and is an International Economic Law and Investment Law consultant.",
      "His practice sits at the intersection of law, trade and capital. He advises investors, enterprises and public bodies on structuring investments into Kenya and the wider region, on the protections available under investment treaties and regional trade instruments, and on managing regulatory and dispute risk across borders.",
      "Clients value his ability to translate complex international frameworks into clear, practical advice — and his insistence on candour about risk. He leads the firm's strategy and remains personally involved in its most significant instructions.",
    ],
    education: ["Doctor of Laws (LL.D), University of South Africa (UNISA), Pretoria"],
    admissions: ["Advocate of the High Court of Kenya"],
    practiceSlugs: ["international-trade-investment", "corporate-commercial", "litigation-dispute-resolution"],
    email: "info@drcokenyariri.co.ke",
  },
  {
    slug: "david-otieno",
    name: "David Otieno",
    role: "Partner",
    focus: "Corporate & Commercial",
    credentials: "LL.M (London), Admitted in Kenya & Uganda",
    bio: [
      "David leads the corporate and commercial practice, advising on transactions, governance and cross-border investment. He is known for keeping complex deals on schedule and for commercially grounded advice that boards can act on.",
    ],
    education: ["LL.M, University of London", "LL.B, University of Nairobi"],
    admissions: ["Advocate of the High Court of Kenya", "Advocate of the High Court of Uganda"],
    practiceSlugs: ["corporate-commercial", "immigration-regulatory"],
    email: "david@drcokenyariri.co.ke",
  },
  {
    slug: "amina-hassan",
    name: "Amina Hassan",
    role: "Senior Associate",
    focus: "Family & Succession",
    credentials: "LL.B (Moi), Advocate of the High Court of Kenya",
    bio: [
      "Amina advises individuals and families on matrimonial matters, children's matters and the administration of estates. She brings calm judgment to sensitive matters and a strong preference for resolutions that protect children and family relationships.",
    ],
    education: ["LL.B, Moi University", "Postgraduate Diploma in Law, Kenya School of Law"],
    admissions: ["Advocate of the High Court of Kenya"],
    practiceSlugs: ["family-succession", "employment-labour"],
    email: "amina@drcokenyariri.co.ke",
  },
];

export const results = [
  {
    tag: "Commercial Dispute",
    text: "Secured a favourable settlement for a regional manufacturer in a KES 240M contract dispute, avoiding prolonged litigation.",
  },
  {
    tag: "Property Litigation",
    text: "Successfully defended title to a Nairobi commercial property against a fraudulent competing claim.",
  },
  {
    tag: "Cross-Border M&A",
    text: "Advised on the acquisition of a Ugandan logistics company by a Kenyan holding group.",
  },
];

export const testimonial = {
  quote:
    "The firm handled our shareholder dispute with a level of discretion and precision we hadn't found elsewhere. They were direct about our options and never overpromised.",
  who: "Managing Director",
  context: "Manufacturing client, Nairobi",
};

export const generalFaqs = [
  {
    q: "How do I book a consultation?",
    a: "Use the consultation form on our contact page, call us, or message us on WhatsApp. You will receive an email confirmation with a reference number immediately, and an advocate will respond within one business day.",
  },
  {
    q: "Is my first enquiry confidential?",
    a: "Yes. Everything you share with us is treated as confidential and handled in line with the Data Protection Act, 2019. Please note that an advocate–client relationship is only formed once we have confirmed our engagement in writing.",
  },
  {
    q: "How are your fees structured?",
    a: "Depending on the matter, we work on hourly rates, fixed fees for defined work, or scale fees under the Advocates Remuneration Order. We always provide a written fee estimate before work begins.",
  },
  {
    q: "Do you act for clients outside Kenya?",
    a: "Yes. Our advocates are admitted in Kenya, Uganda and Tanzania, and we regularly act for clients in the diaspora and international companies investing in East Africa. Consultations can be held by Microsoft Teams.",
  },
  {
    q: "What should I bring to my first consultation?",
    a: "Any documents relevant to your matter — contracts, correspondence, title documents, court papers — and a short timeline of events. Your confirmation email lists what is most useful for your practice area.",
  },
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  author: string; // advocate slug
  practice: string; // practice slug
  readingMinutes: number;
  body: { type: "p" | "h2"; text: string }[];
};

export const posts: Post[] = [
  {
    slug: "buying-land-in-kenya-due-diligence-checklist",
    title: "Buying Land in Kenya: A Due Diligence Checklist",
    excerpt: "The searches, documents and checks that protect a buyer from fraud before a single shilling changes hands.",
    date: "2026-08-12",
    author: "dr-christopher-kenyariri",
    practice: "real-estate-conveyancing",
    readingMinutes: 6,
    body: [
      { type: "p", text: "Land fraud remains one of the most common sources of property disputes in Kenya. The good news is that most of it is preventable with disciplined due diligence before any deposit is paid." },
      { type: "h2", text: "1. Conduct an official search" },
      { type: "p", text: "An official search at the land registry — increasingly via Ardhisasa — confirms the registered proprietor and any charges, cautions or restrictions on the title." },
      { type: "h2", text: "2. Verify the seller's identity and capacity" },
      { type: "p", text: "Confirm that the seller is the registered owner, or holds valid authority to sell. For companies, review a CR12 and board resolution." },
      { type: "h2", text: "3. Confirm the physical land matches the title" },
      { type: "p", text: "Engage a licensed surveyor to confirm beacons and boundaries against the registry index map." },
      { type: "h2", text: "4. Check rates, rent and planning status" },
      { type: "p", text: "Obtain county rates and land rent clearance, and confirm that the intended use is permitted under the applicable zoning and planning approvals." },
      { type: "h2", text: "5. Pay through your advocate" },
      { type: "p", text: "Deposits and balances should be held by the advocates on professional undertakings until the transfer is registered. This single step closes off most of the risk that remains." },
      { type: "p", text: "Every transaction is different. If you are considering a purchase, speak to us before you sign anything or pay a deposit." },
    ],
  },
  {
    slug: "data-protection-act-compliance-for-smes",
    title: "Data Protection Act, 2019: What Kenyan SMEs Must Do Now",
    excerpt: "Registration with the ODPC, lawful bases for processing and the practical steps that reduce regulatory risk.",
    date: "2026-07-03",
    author: "david-otieno",
    practice: "corporate-commercial",
    readingMinutes: 5,
    body: [
      { type: "p", text: "The Office of the Data Protection Commissioner has stepped up enforcement, and penalties now reach businesses of every size." },
      { type: "h2", text: "Who must register?" },
      { type: "p", text: "Data controllers and processors meeting the thresholds in the Data Protection (Registration of Data Controllers and Data Processors) Regulations must register with the ODPC." },
      { type: "h2", text: "Establish a lawful basis" },
      { type: "p", text: "Every processing activity — payroll, marketing lists, CCTV, customer records — needs a lawful basis such as consent, contract or legitimate interest. Document it." },
      { type: "h2", text: "Practical first steps" },
      { type: "p", text: "Map the personal data you hold, update privacy notices, put data processing agreements in place with vendors and train staff on handling access requests and breaches." },
      { type: "p", text: "Our corporate team runs short compliance reviews for SMEs, with a clear action plan at the end." },
    ],
  },
  {
    slug: "protecting-foreign-investment-in-kenya",
    title: "Protecting Foreign Investment in Kenya: Treaties, Contracts and Structure",
    excerpt: "How investors can use investment treaties, well-drafted contracts and the right holding structure to manage political and regulatory risk.",
    date: "2026-09-02",
    author: "dr-christopher-kenyariri",
    practice: "international-trade-investment",
    readingMinutes: 7,
    body: [
      { type: "p", text: "Capital flows to jurisdictions where investors understand their rights. Kenya offers a meaningful framework of protection — but the value of that protection depends heavily on decisions made before the first shilling is invested." },
      { type: "h2", text: "Treaty protection starts with structure" },
      { type: "p", text: "Bilateral investment treaties protect investors of the contracting states. The nationality of the holding entity therefore matters, and should be considered alongside tax and commercial factors at the outset." },
      { type: "h2", text: "Contracts do the daily work" },
      { type: "p", text: "Stabilisation clauses, dispute resolution provisions and carefully allocated regulatory risk in concession and supply agreements often determine outcomes long before any treaty claim is contemplated." },
      { type: "h2", text: "Prevention over proceedings" },
      { type: "p", text: "Most investor–state tensions are resolved through early engagement with regulators. A clear record of compliance and communication strengthens the investor's position whichever way the matter develops." },
      { type: "p", text: "We advise investors and public bodies on each of these stages. Contact us to discuss your structure." },
    ],
  },
];

export function getPractice(slug: string) {
  return practiceAreas.find((p) => p.slug === slug);
}
export function getAdvocate(slug: string) {
  return advocates.find((a) => a.slug === slug);
}
export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
