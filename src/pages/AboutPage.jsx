import About from '../components/About.jsx';
import CTA from '../components/CTA.jsx';
import PageHeader from '../components/PageHeader.jsx';
import Stats from '../components/Stats.jsx';

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Corporate-grade solar delivery, end-to-end."
        subtitle="Enersource Inc. provides full lifecycle solar solutions across Liberia — engineered for safety, performance, and long-term support."
      />
      <Stats />
      <About />
      <CTA />
    </>
  );
}

