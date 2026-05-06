import { CASE_STUDIES, getCaseStudy } from "@/lib/case-studies";
import type { Metadata } from "next";
import CaseStudyPage from "./CaseStudyPage";

export function generateStaticParams() {
  return CASE_STUDIES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const study = getCaseStudy(params.slug);

  if (!study) {
    return {
      title: "Case Study Not Found — faja",
      description: "We couldn't find that case study.",
    };
  }

  return {
    title: `${study.headline} — faja`,
    description: `${study.situation} ${study.build}`.slice(0, 160),
  };
}

export default function Page({
  params,
}: {
  params: { slug: string };
}) {
  return <CaseStudyPage slug={params.slug} />;
}
