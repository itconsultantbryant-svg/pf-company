import About from '../components/About.jsx';
import BlogPreview from '../components/BlogPreview.jsx';
import CTA from '../components/CTA.jsx';
import Contact from '../components/Contact.jsx';
import HomeCommercialShowcase from '../components/HomeCommercialShowcase.jsx';
import HomeHeroSlider from '../components/HomeHeroSlider.jsx';
import Hero from '../components/Hero.jsx';
import Partners from '../components/Partners.jsx';
import Projects from '../components/Projects.jsx';
import Services from '../components/Services.jsx';
import Stats from '../components/Stats.jsx';
import Testimonials from '../components/Testimonials.jsx';

export default function Home() {
  return (
    <>
      <HomeHeroSlider />
      <Hero />
      <HomeCommercialShowcase />
      <Stats />
      <About />
      <Services />
      <Projects />
      <Partners />
      <Testimonials />
      <BlogPreview />
      <Contact />
      <CTA />
    </>
  );
}

