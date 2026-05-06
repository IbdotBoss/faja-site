"use client"

import { useState, useRef } from "react"
import { gsap } from "@/lib/gsap"
import { DURATION } from "@/lib/ease"
import Fascia from "@/components/Fascia"
import VerticalCutReveal from "@/components/fancy/VerticalCutReveal"

const PROJECT_TYPES = [
  "Website",
  "App",
  "Automation",
  "AI Agent",
  "Not sure yet",
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // POST to API
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
    } catch {
      // Still show success — API handles logging
    }

    // Animate form retraction
    const form = formRef.current
    if (!form) return

    gsap.to(form, {
      opacity: 0,
      y: -20,
      duration: DURATION.fast,
      ease: "taut",
      onComplete: () => {
        setSubmitted(true)
      },
    })
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-white">
      <div className="max-w-[800px] mx-auto px-8">
        <Fascia className="mb-16" />

        {/* Headline */}
        <h2
          className="text-4xl md:text-5xl mb-4"
          style={{
            fontWeight: 700,
            fontVariationSettings: '"wght" 700',
            color: "#0A0A0A",
          }}
        >
          <VerticalCutReveal splitBy="words" staggerDuration={0.08}>
            Ready to operate beyond your size?
          </VerticalCutReveal>
        </h2>

        {/* Subline */}
        <p
          className="text-lg mb-12"
          style={{
            fontWeight: 380,
            fontVariationSettings: '"wght" 380',
            color: "#0A0A0A",
          }}
        >
          Tell us about your project. We&rsquo;ll tell you exactly what we&rsquo;d build.
        </p>

        {/* Form or confirmation */}
        {!submitted ? (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
            {/* Name */}
            <InputField
              label="Name"
              type="text"
              value={formData.name}
              onChange={(v) => setFormData({ ...formData, name: v })}
              required
            />

            {/* Email */}
            <InputField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(v) => setFormData({ ...formData, email: v })}
              required
            />

            {/* Project type dropdown */}
            <ProjectTypeSelect
              value={formData.projectType}
              onChange={(v) => setFormData({ ...formData, projectType: v })}
            />

            {/* Message */}
            <div>
              <label
                className="text-xs tracking-[0.1em] uppercase text-[#1A1A4D] mb-2 block"
                style={{
                  fontWeight: 300,
                  fontVariationSettings: '"wght" 300',
                }}
              >
                Tell us about your business
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
                className="w-full bg-transparent text-[#0A0A0A] text-sm focus:outline-none resize-none py-2"
                style={{
                  border: "none",
                  borderBottom: "1px solid #1A1A4D",
                  borderRadius: 0,
                  fontWeight: 380,
                  fontVariationSettings: '"wght" 380',
                }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn-wipe px-8 py-3 text-sm rounded-full w-full md:w-auto"
              style={{ borderRadius: "999px" }}
            >
              <span>Send it</span>
              <span className="ml-1">→</span>
            </button>

            {/* Minimum engagement note */}
            <p
              className="text-xs mt-4"
              style={{
                fontWeight: 300,
                fontVariationSettings: '"wght" 300',
                color: "#666666",
              }}
            >
              Minimum engagement £2,000. We work with a small number of clients
              at a time.
            </p>
          </form>
        ) : (
          <div className="py-16 text-center">
            <p
              className="text-2xl md:text-3xl"
              style={{
                fontWeight: 700,
                fontVariationSettings: '"wght" 700',
                color: "#0A0A0A",
              }}
            >
              We&rsquo;ll be in touch.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

function InputField({
  label,
  type,
  value,
  onChange,
  required,
}: {
  label: string
  type: string
  value: string
  onChange: (v: string) => void
  required?: boolean
}) {
  return (
    <div>
      <label
        className="text-xs tracking-[0.1em] uppercase text-[#1A1A4D] mb-2 block"
        style={{ fontWeight: 300, fontVariationSettings: '"wght" 300' }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full bg-transparent text-[#0A0A0A] text-sm py-2 focus:outline-none"
          style={{
            border: "none",
            borderBottom: "1px solid #1A1A4D",
            borderRadius: 0,
            fontWeight: 380,
            fontVariationSettings: '"wght" 380',
          }}
          onFocus={(e) => {
            // Scale bottom border from center
            const input = e.target
            input.style.borderBottom = "1px solid #1A1A4D"
          }}
        />
      </div>
    </div>
  )
}

function ProjectTypeSelect({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label
        className="text-xs tracking-[0.1em] uppercase text-[#1A1A4D] mb-2 block"
        style={{ fontWeight: 300, fontVariationSettings: '"wght" 300' }}
      >
        Project type
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full bg-transparent text-[#0A0A0A] text-sm py-2 focus:outline-none appearance-none cursor-pointer"
        style={{
          border: "none",
          borderBottom: "1px solid #1A1A4D",
          borderRadius: 0,
          fontWeight: 380,
          fontVariationSettings: '"wght" 380',
        }}
      >
        <option value="" disabled>
          Select project type
        </option>
        {PROJECT_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  )
}
