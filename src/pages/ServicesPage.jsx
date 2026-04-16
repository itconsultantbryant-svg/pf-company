import CTA from '../components/CTA.jsx';
import Contact from '../components/Contact.jsx';
import PageHeader from '../components/PageHeader.jsx';
import Services from '../components/Services.jsx';

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="From design to maintenance — built to scale."
        subtitle="Choose complete solar delivery or targeted support. We tailor solutions for residential, commercial, and institutional clients."
      />
      <Services />
      <Contact />
      <CTA />
    </>
  );
}

