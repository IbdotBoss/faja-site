export interface CaseStudy {
  slug: string
  label: string
  headline: string
  situation: string
  build: string
  before: string
  after: string
  beyond: string
  /** The service category for navigation context */
  category: "web" | "automation" | "ai"
  /** Client archetype for context */
  client: string
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "salon-digital-presence",
    label: "Web & mobile",
    headline: "The salon with no digital presence.",
    situation:
      "Fully booked by word of mouth. Invisible everywhere else. No website, no booking, no way to capture demand beyond referrals.",
    build: "We build a custom site with integrated booking, a portfolio of their work, and local SEO that puts them in front of clients already looking.",
    before: "No digital presence. Calls only.",
    after: "Looks and books like a premium brand.",
    beyond: "A two-person salon competing digitally with a chain.",
    category: "web",
    client: "Independent salon, UK",
  },
  {
    slug: "ecommerce-ceiling",
    label: "Web & mobile",
    headline: "The e-commerce brand hitting its ceiling.",
    situation:
      "Growing on Shopify, strong sales, but no loyalty programme, no clean subscriptions, one-time buyers not returning.",
    build: "We build a custom web app — loyalty flows, subscription management, personalised reorders — integrated directly into their existing backend.",
    before: "A store. Customers buy once and leave.",
    after: "A brand. Customers with a reason to return.",
    beyond: "Post-purchase experience of a business ten times their size.",
    category: "web",
    client: "UK e-commerce brand, £100k–300k",
  },
  {
    slug: "admin-automation",
    label: "Automation",
    headline: "The solopreneur losing a day a week to admin.",
    situation:
      "Billing four days, spending the fifth entirely on enquiries, onboarding, contracts, invoices, follow-ups. All manual. All eating the hours that should be earning.",
    build: "We build a full admin automation stack. Enquiry arrives — welcome sent — questionnaire issued — contract generated — invoice raised — follow-up triggered. End to end, without touching it.",
    before: "15+ hours a week on admin.",
    after: "The stack runs itself. They bill the fifth day.",
    beyond: "Operates like they have an admin team. They don't.",
    category: "automation",
    client: "UK service solopreneur",
  },
  {
    slug: "letting-agent-ai",
    label: "AI & agents",
    headline: "The letting agency losing leads every weekend.",
    situation:
      "Three people, high enquiry volume, 9-to-5 operation. Leads arriving out of hours sit unanswered until Monday. Larger agencies winning purely on responsiveness.",
    build: "We build an AI agent handling all property enquiries 24/7 — answering specific questions, qualifying leads, booking viewings into the team's calendar. Escalates to a human only when needed.",
    before: "Out-of-hours leads wait until Monday.",
    after: "Every lead handled immediately.",
    beyond: "The responsiveness of a large corporate agency. Run by three people.",
    category: "ai",
    client: "UK independent letting agency",
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((s) => s.slug === slug)
}

export function getCaseStudySlugs(): string[] {
  return CASE_STUDIES.map((s) => s.slug)
}
