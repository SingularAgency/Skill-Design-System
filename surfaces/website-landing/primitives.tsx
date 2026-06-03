"use client"

/**
 * Primitivos del perfil WEBSITE/LANDING de Singular.
 * Portados de FramerSingular/custom-ai.tsx y tokenizados (sin hex hardcodeados):
 * los acentos salen de los tokens del DS (--primary, --gradient-primary, --border…).
 *
 * Requiere: framer-motion (peer dep del perfil web) + los CSS del DS
 * (theme-web.css + website.css + brand-background.css).
 *
 * Router-agnóstico: CtaButton usa <a> + scroll-to-anchor (no next/wouter).
 */
import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

/* Reveal on-scroll (respeta reduced-motion) */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* Eyebrow — label uppercase de marca (color --primary + dot) */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`eyebrow eyebrow--brand ${className}`}>{children}</span>
}

/* Encabezado de sección: eyebrow + título + subtítulo */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow: string
  title: ReactNode
  subtitle?: string
  center?: boolean
}) {
  return (
    <div className={center ? "landing-heading landing-heading--center" : "landing-heading"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="page-title" style={{ marginTop: "var(--gap-m)", fontSize: "clamp(1.875rem, 4vw, 3rem)" }}>
        {title}
      </h2>
      {subtitle && <p className="page-subtitle" style={{ marginTop: "var(--gap-m)", maxWidth: "46rem" }}>{subtitle}</p>}
    </div>
  )
}

/* CTA — variantes tokenizadas. primary=blanco, accent=gradiente de marca, secondary=outline. */
export function CtaButton({
  cta,
  variant = "primary",
  className = "",
}: {
  cta: { label: string; href: string }
  variant?: "primary" | "secondary" | "accent"
  className?: string
}) {
  const reduce = useReducedMotion()
  const onClick =
    cta.href.startsWith("#")
      ? (e: React.MouseEvent) => {
          e.preventDefault()
          document.getElementById(cta.href.slice(1))?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
        }
      : undefined
  return (
    <a href={cta.href} onClick={onClick} className={`cta cta--${variant} ${className}`}>
      {cta.label}
    </a>
  )
}

/* Sección de landing: ritmo + borde + fondo (alt para alternar) */
export function Section({ children, id, alt = false, pad = "m" }: { children: ReactNode; id?: string; alt?: boolean; pad?: "s" | "m" | "l" }) {
  return (
    <section id={id} className={`landing-section section-pad-${pad}`} style={alt ? { background: "color-mix(in srgb, var(--foreground) 2%, var(--background))" } : undefined}>
      <div className="landing-container">{children}</div>
    </section>
  )
}

/* Chip de herramienta/sistema */
export function SystemChip({ icon, label, className = "" }: { icon?: ReactNode; label: string; className?: string }) {
  return (
    <span className={`system-chip ${className}`}>
      {icon}
      {label}
    </span>
  )
}

/* Marquee de logos (duplicar children para loop seamless) */
export function LogoMarquee({ children, speed = "40s" }: { children: ReactNode; speed?: string }) {
  return (
    <div className="marquee-mask">
      <div className="marquee" style={{ ["--marquee-speed" as string]: speed }}>
        {children}
        {children}
      </div>
    </div>
  )
}
