"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { DURATION } from "@/lib/ease";
import { getCaseStudy } from "@/lib/case-studies";
import Nav from "@/components/Nav";
import Fascia from "@/components/Fascia";
import Footer from "@/components/Footer";

export default function CaseStudyPage({ slug }: { slug: string }) {
  const mainRef = useRef<HTMLDivElement>(null);
  const study = getCaseStudy(slug);

  // Scroll-triggered Fascia + text reveal animations for all sections
  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const ctx = gsap.context(() => {
      const sections = main.querySelectorAll("[data-scroll-section]");

      sections.forEach((section) => {
        const fascia = section.querySelector("[data-fascia]") as HTMLElement;
        const headlines = section.querySelectorAll("[data-reveal='headline']");
        const bodyElements = section.querySelectorAll("[data-reveal='body']");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section as HTMLElement,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        // 1. Fascia draws
        if (fascia) {
          tl.fromTo(
            fascia,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              duration: DURATION.draw,
              ease: "taut",
              transformOrigin: "left center",
            },
            0,
          );
        }

        // 2. Headlines clip-path reveal
        headlines.forEach((el, i) => {
          tl.fromTo(
            el,
            { clipPath: "inset(0 0 100% 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              duration: 0.6,
              ease: "taut",
            },
            i === 0 ? 0.5 : 0.7,
          );
        });

        // 3. Body line-by-line reveal
        bodyElements.forEach((el, i) => {
          const split = new SplitText(el as HTMLElement, {
            type: "lines",
            linesClass: "split-line",
          });

          tl.fromTo(
            split.lines,
            { clipPath: "inset(0 0 100% 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              duration: 0.5,
              ease: "taut",
              stagger: 0.04,
            },
            1.0 + i * 0.1,
          );
        });

        // Fascia retraction on scroll out
        ScrollTrigger.create({
          trigger: section as HTMLElement,
          start: "top 75%",
          onLeaveBack: () => {
            if (fascia) {
              gsap.to(fascia, {
                scaleX: 0,
                duration: DURATION.fast,
                ease: "taut",
                transformOrigin: "right center",
              });
            }
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  // 404: slug not found
  if (!study) {
    return (
      <main className="min-h-screen bg-white">
        <Nav />
        <div className="max-w-[1440px] mx-auto px-8 pt-32 pb-24 flex flex-col items-center justify-center min-h-[60vh]">
          <h1
            className="text-4xl md:text-5xl mb-6"
            style={{
              fontWeight: 700,
              fontVariationSettings: '"wght" 700',
              color: "#0A0A0A",
            }}
          >
            Case study not found
          </h1>
          <p
            className="text-lg mb-8 text-center max-w-[500px]"
            style={{
              fontWeight: 380,
              fontVariationSettings: '"wght" 380',
              color: "#0A0A0A",
            }}
          >
            We couldn&apos;t find that case study. It may have been moved or
            removed.
          </p>
          <a
            href="/#work"
            className="btn-wipe px-8 py-3 text-sm rounded-full"
            style={{ borderRadius: "999px" }}
          >
            <span>View all work</span>
            <span className="ml-1">→</span>
          </a>
        </div>
        <Footer />
      </main>
    );
  }

  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document
      .querySelector("#contact")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main ref={mainRef} className="min-h-screen bg-white">
      <Nav />

      {/* ── Hero ── */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-[1440px] mx-auto px-8">
          {/* Label — small caps */}
          <span
            className="text-xs tracking-[0.15em] uppercase text-[#1A1A4D] mb-6 block"
            style={{ fontVariationSettings: '"wght" 300' }}
          >
            {study.label}
          </span>

          {/* Headline — large, bold */}
          <h1
            className="leading-[1.05] tracking-[-0.02em] max-w-[900px]"
            style={{
              fontSize: "clamp(48px, 6vw, 96px)",
              fontWeight: 700,
              fontVariationSettings: '"wght" 700',
              color: "#0A0A0A",
            }}
          >
            {study.headline}
          </h1>
        </div>
      </section>

      {/* ── Fascia divider ── */}
      <div className="max-w-[1440px] mx-auto px-8">
        <Fascia className="mb-16" />
      </div>

      {/* ── Situation ── */}
      <section data-scroll-section className="py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-8">
          <div data-reveal="body" className="max-w-[700px]">
            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{
                fontWeight: 380,
                fontVariationSettings: '"wght" 380',
                color: "#0A0A0A",
              }}
            >
              {study.situation}
            </p>
          </div>
        </div>
      </section>

      {/* ── What we build ── */}
      <section data-scroll-section className="py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-8">
          <div data-fascia className="w-full mb-12">
            <Fascia />
          </div>
          <div className="max-w-[700px]">
            <h2
              data-reveal="headline"
              className="text-2xl md:text-3xl mb-6"
              style={{
                fontWeight: 600,
                fontVariationSettings: '"wght" 600',
                color: "#0A0A0A",
              }}
            >
              What we build
            </h2>
            <p
              data-reveal="body"
              className="text-lg md:text-xl leading-relaxed"
              style={{
                fontWeight: 380,
                fontVariationSettings: '"wght" 380',
                color: "#0A0A0A",
              }}
            >
              {study.build}
            </p>
          </div>
        </div>
      </section>

      {/* ── Before / After ── */}
      <section data-scroll-section className="py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="border-l border-[#1A1A4D] pl-6 md:pl-8 max-w-[700px]">
            <p
              data-reveal="body"
              className="text-2xl md:text-3xl lg:text-4xl mb-6 leading-tight"
              style={{
                fontWeight: 300,
                fontVariationSettings: '"wght" 300',
                color: "#0A0A0A",
              }}
            >
              {study.before}
            </p>
            <p
              data-reveal="body"
              className="text-2xl md:text-3xl lg:text-4xl leading-tight"
              style={{
                fontWeight: 800,
                fontVariationSettings: '"wght" 800',
                color: "#0A0A0A",
              }}
            >
              {study.after}
            </p>
          </div>
        </div>
      </section>

      {/* ── The beyond ── */}
      <section data-scroll-section className="py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-8">
          <div data-fascia className="w-full mb-12">
            <Fascia />
          </div>
          <div data-reveal="body" className="max-w-[700px]">
            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{
                fontWeight: 380,
                fontVariationSettings: '"wght" 380',
                color: "#1A1A4D",
              }}
            >
              {study.beyond}
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-8 flex flex-col items-center text-center">
          <a
            href="#contact"
            onClick={handleCTAClick}
            className="btn-wipe px-8 py-3 text-sm rounded-full"
            style={{ borderRadius: "999px" }}
          >
            <span>Start a project</span>
            <span className="ml-1">→</span>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
