"use client"

/**
 * Primitivos del perfil WEBSITE/LANDING de Singular.
 * Fuente actual: singular-landing, rama codex/home-gargantua-scroll-camera.
 *
 * Portable: no importa next/*, wouter, booking providers, nav/footer del sitio
 * ni datos comerciales. Los acentos salen de tokens del DS y data-page-accent.
 *
 * Requiere: framer-motion (peer dep del perfil web) + los CSS del DS
 * (theme-web.css + website.css + brand-background.css).
 */
import { motion, useReducedMotion } from "framer-motion"
import type { CSSProperties, ElementType, MouseEvent, ReactNode } from "react"
import { BrandBackground } from "../../backgrounds/BrandBackground"

const REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

/* Reveal on-scroll (respeta reduced-motion) */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: reduce ? 0.01 : 0.52, delay: reduce ? 0 : delay, ease: REVEAL_EASE }}
    >
      {children}
    </motion.div>
  )
}

/* Shell minimo: el producto host decide nav/footer/routing. */
export function PageShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={cx("landing-page-shell", className)}>{children}</div>
}

/* Eyebrow — label uppercase de marca (color --singular-secondary + dot) */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={cx("eyebrow eyebrow--brand", className)}>{children}</span>
}

/* Encabezado de seccion: eyebrow + titulo + subtitulo */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow: string
  title: ReactNode
  subtitle?: ReactNode
  center?: boolean
}) {
  return (
    <div className={cx("landing-heading", center && "landing-heading--center")}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="landing-heading__title">{title}</h2>
      {subtitle && <p className="landing-heading__subtitle">{subtitle}</p>}
    </div>
  )
}

/* Hero canonico del perfil marketing. */
export function HeroSection({
  eyebrow,
  title,
  subtitle,
  strapline,
  children,
  visual,
  size = "standard",
  layout,
  className = "",
  contentClassName = "",
  titleClassName = "",
  subtitleClassName = "",
  visualClassName = "",
  backgroundVariant = "static",
}: {
  eyebrow?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  strapline?: ReactNode
  children?: ReactNode
  visual?: ReactNode
  size?: "compact" | "standard" | "immersive"
  layout?: "center" | "split"
  className?: string
  contentClassName?: string
  titleClassName?: string
  subtitleClassName?: string
  visualClassName?: string
  backgroundVariant?: "static" | "animated"
}) {
  const resolvedLayout = layout ?? (visual ? "split" : "center")

  return (
    <section
      className={cx(
        "singular-hero-section",
        `singular-hero--${size}`,
        resolvedLayout === "split" ? "singular-hero--split" : "singular-hero--center",
        className
      )}
    >
      <BrandBackground asBackdrop variant={backgroundVariant} />
      <div className={cx("singular-hero-inner", resolvedLayout === "split" && "singular-hero-inner--split", contentClassName)}>
        <div className={cx("singular-hero-copy", resolvedLayout === "center" && "singular-hero-copy--center")}>
          {eyebrow && <Eyebrow className="singular-hero-eyebrow">{eyebrow}</Eyebrow>}
          <h1 className={cx("singular-hero-title", size === "immersive" && "singular-hero-title--immersive", titleClassName)}>{title}</h1>
          {subtitle && <p className={cx("singular-hero-subtitle", subtitleClassName)}>{subtitle}</p>}
          {strapline && <p className="singular-hero-strapline">{strapline}</p>}
          {children && <div className="singular-hero-actions">{children}</div>}
        </div>
        {visual && <Reveal delay={0.12} className={cx("singular-hero-visual", visualClassName)}>{visual}</Reveal>}
      </div>
    </section>
  )
}

/* CTA simple — primary=blanco, accent=gradiente, secondary=glass outline. */
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
      ? (e: MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault()
          document.getElementById(cta.href.slice(1))?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
        }
      : undefined
  return (
    <a href={cta.href} onClick={onClick} className={cx("cta premium-cta", `cta--${variant}`, className)}>
      {cta.label}
    </a>
  )
}

/* Seccion de landing: ritmo + fondo semantico. */
export function Section({
  children,
  id,
  alt = false,
  pad = "m",
  className = "",
}: {
  children: ReactNode
  id?: string
  alt?: boolean
  pad?: "s" | "m" | "l" | "prefooter"
  className?: string
}) {
  return (
    <section id={id} className={cx("landing-section", `section-pad-${pad}`, alt && "landing-section--alt", className)}>
      <div className="landing-container">{children}</div>
    </section>
  )
}

export function MarketingCard({ children, as, className = "", style }: { children: ReactNode; as?: ElementType; className?: string; style?: CSSProperties }) {
  const Comp = as ?? "div"
  return <Comp className={cx("marketing-card card-surface--interactive", className)} style={style}>{children}</Comp>
}

/* Chip de herramienta/sistema */
export function SystemChip({ icon, label, className = "" }: { icon?: ReactNode; label: string; className?: string }) {
  return (
    <span className={cx("system-chip", className)}>
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

export function TestimonialCard({
  quote,
  author,
  role,
  image,
  className = "",
}: {
  quote: ReactNode
  author: string
  role: string
  image?: string | null
  className?: string
}) {
  return (
    <MarketingCard className={cx("testimonial-card", className)}>
      <p className="testimonial-card__quote">{quote}</p>
      <div className="testimonial-card__person">
        <div className="testimonial-card__avatar">
          {image ? <img src={image} alt={author} /> : author.slice(0, 1)}
        </div>
        <div>
          <div className="testimonial-card__author">{author}</div>
          <div className="testimonial-card__role">{role}</div>
        </div>
      </div>
    </MarketingCard>
  )
}

export function FinalCTA({
  title,
  subtitle,
  cta,
  secondaryCta,
}: {
  title: ReactNode
  subtitle?: ReactNode
  cta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}) {
  return (
    <Section pad="prefooter" className="singular-cta-section">
      <Reveal className="singular-final-cta">
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
        <div className="singular-final-cta__actions">
          <CtaButton cta={cta} variant="accent" />
          {secondaryCta && <CtaButton cta={secondaryCta} variant="secondary" />}
        </div>
      </Reveal>
    </Section>
  )
}

export function InlineLinkCTA({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} className={cx("inline-link-cta", className)}>
      <span>{children}</span>
      <span aria-hidden="true">-></span>
    </a>
  )
}
