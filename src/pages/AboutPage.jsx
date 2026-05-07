import About from '../components/About.jsx';
import CTA from '../components/CTA.jsx';
import PageHeader from '../components/PageHeader.jsx';
import Stats from '../components/Stats.jsx';
import aboutHeaderImage from '../assets/about-page.jpeg';

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Corporate-grade solar delivery, end-to-end."
        subtitle="Enersource Inc. provides full lifecycle solar solutions across Liberia — engineered for safety, performance, and long-term support."
        backgroundImage={aboutHeaderImage}
        imageOverlay="strong"
      />
      <Stats />
      <About />
      <CTA />
    </>
  );
}

