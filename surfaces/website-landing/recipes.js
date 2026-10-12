// Executable copy examples. Paths assume an exported singular/ snapshot beside the example.
window.SingularWebsiteRecipes = {
  hero: `import { PageShell, HeroSection, CtaButton, Section } from "./singular/surfaces/website-landing/primitives";

export default function Example() {
  return <PageShell>
    <HeroSection
      eyebrow="Website surface"
      secondaryEyebrow="One shared language"
      title={<>Clear stories. <span className="text-gradient-brand">One Singular language.</span></>}
      subtitle="Explain the outcome, the system, and the next useful step."
      backgroundVariant="none"
      className="singular-hero--wide"
    >
      <CtaButton variant="accent" cta={{ label: "Explore the patterns", shortLabel: "Explore", href: "#patterns" }} />
    </HeroSection>
    <Section id="patterns"><h2>Start with the reader’s situation.</h2></Section>
  </PageShell>;
}`,
  tabs: `import { LandingTabs, MarketingCard, SectionHeading } from "./singular/surfaces/website-landing/primitives";

export default function Example() {
  return <LandingTabs ariaLabel="Website patterns" tabs={[
    { id: "story", label: "Story", panel: <SectionHeading eyebrow="Context" title="Lead with the outcome." maxWidth="60rem" /> },
    { id: "system", label: "System", panel: <MarketingCard><h3>Use shared primitives.</h3><p>The host owns the content.</p></MarketingCard> },
  ]} />;
}`,
  marquee: `import { LogoMarquee, Reveal, SystemChip } from "./singular/surfaces/website-landing/primitives";

export default function Example() {
  return <Reveal direction="left" distance={32}>
    <LogoMarquee ariaLabel="Website building blocks" gap="3rem" speed="40s" trackClassName="website-building-blocks">
      <SystemChip label="HeroSection" />
      <SystemChip label="MarketingCard" />
      <SystemChip label="LandingTabs" />
      <SystemChip label="FinalCTA" />
    </LogoMarquee>
  </Reveal>;
}`,
};
