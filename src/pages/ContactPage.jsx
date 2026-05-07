import CTA from '../components/CTA.jsx';
import Contact from '../components/Contact.jsx';
import PageHeader from '../components/PageHeader.jsx';
import contactHeaderImage from '../assets/contact-page.jpeg';

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Request a quote or consultation."
        subtitle="Send a message and we’ll reply with clear next steps, timeline, and requirements for your site."
        backgroundImage={contactHeaderImage}
        imageOverlay="medium"
      />
      <Contact />
      <CTA />
    </>
  );
}

