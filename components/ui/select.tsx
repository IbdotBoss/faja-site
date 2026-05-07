"use client"

import { useState, useRef, useEffect, ReactNode, Children } from "react"

interface SelectProps {
  value: string
  onValueChange: (value: string) => void
  children: ReactNode
  placeholder?: string
  label?: string
  required?: boolean
  className?: string
}

interface SelectItemProps {
  value: string
  children: ReactNode
  disabled?: boolean
}

/**
 * Custom Select component — shadcn/ui pattern with faja styling.
 * Bottom border only, scaleX focus, no border-radius, taut transitions.
 */
export function Select({
  value,
  onValueChange,
  children,
  placeholder = "Select...",
  label,
  required,
  className = "",
}: SelectProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open])

  const childArray = Children.toArray(children) as React.ReactElement<SelectItemProps>[]

  const selectedLabel = value
    ? childArray.find((child) => child.props.value === value)?.props.children
    : null

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {label && (
        <label
          className="text-xs tracking-[0.1em] uppercase text-[#1A1A4D] mb-2 block"
          style={{ fontWeight: 300, fontVariationSettings: '"wght" 300' }}
        >
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-transparent text-[#0A0A0A] text-sm py-2 focus:outline-none cursor-pointer"
        style={{
          border: "none",
          borderBottom: "1px solid #1A1A4D",
          borderRadius: 0,
          fontWeight: 380,
          fontVariationSettings: '"wght" 380',
        }}
      >
        <span className={!value ? "text-[#999]" : ""}>
          {selectedLabel || placeholder}
        </span>
        {/* Chevron */}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="#1A1A4D"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute left-0 right-0 top-full mt-1 z-50 bg-white border border-[#1A1A4D] overflow-hidden"
          style={{ borderRadius: 0 }}
        >
          <div className="py-1 max-h-60 overflow-y-auto">
            {childArray.map((child) => {
              if (!child.props.value) return null
              const isSelected = child.props.value === value
              const isDisabled = child.props.disabled

              return (
                <button
                  key={child.props.value}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => {
                    onValueChange(child.props.value)
                    setOpen(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    isDisabled
                      ? "text-[#ccc] cursor-not-allowed"
                      : isSelected
                        ? "bg-[#1A1A4D] text-white"
                        : "text-[#0A0A0A] hover:bg-[#f5f5f5]"
                  }`}
                  style={{
                    fontWeight: 380,
                    fontVariationSettings: '"wght" 380',
                    borderRadius: 0,
                    border: "none",
                    cursor: isDisabled ? "not-allowed" : "pointer",
                  }}
                >
                  {child.props.children}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Hidden native select for form validation */}
      {required && (
        <select
          value={value}
          onChange={() => {}}
          required
          className="sr-only"
          tabIndex={-1}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {childArray.map(
            (child) =>
              child.props.value ? (
                <option key={child.props.value} value={child.props.value}>
                  {child.props.value}
                </option>
              ) : null
          )}
        </select>
      )}
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SelectItem(props: SelectItemProps) {
  return null // Rendered by parent via Children.toArray
}
