import CTA from '../components/CTA.jsx';
import Contact from '../components/Contact.jsx';
import PageHeader from '../components/PageHeader.jsx';
import Partners from '../components/Partners.jsx';
import ProjectGallerySlider from '../components/ProjectGallerySlider.jsx';
import Projects from '../components/Projects.jsx';
import Testimonials from '../components/Testimonials.jsx';

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Milestones that prove reliability."
        subtitle="A growing portfolio — healthcare, finance, and institutional deployments — delivered with an engineering-first approach."
      />
      <ProjectGallerySlider />
      <Projects />
      <Partners />
      <Testimonials />
      <Contact />
      <CTA />
    </>
  );
}

