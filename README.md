# Enersource Inc. — Corporate Solar Website

Modern, responsive, highly interactive corporate website for **Enersource Inc.** (solar energy company), with clean-energy branding, strong UX/UI, animations, and accessibility basics.

## Tech stack

- React + Vite
- React Router
- Tailwind CSS
- Framer Motion
- Swiper.js
- Lucide icons
- EmailJS (optional, for contact form)

printf "protocol=https\nhost=github.com\n" | git credential-osxkeychain erase
git push

## Brand + assets

- Company logo: `assets/enersource_logo.jpeg` (used in `Navbar` + `Footer`)
- Design system:
  - Primary: `#FDB813` (solar yellow)
  - Secondary: `#0B3C5D` (deep blue)
  - Accent: `#00A896` (energy green)
  - Typography: Poppins/Inter (headings), Open Sans/Roboto (body)

## Project structure

```
src/
  components/
    Navbar.jsx
    Footer.jsx
    Hero.jsx
    Services.jsx
    About.jsx
    Projects.jsx
    Partners.jsx
    Testimonials.jsx
    Contact.jsx
    Stats.jsx
    CTA.jsx
  pages/
    Home.jsx
    AboutPage.jsx
    ServicesPage.jsx
    ProjectsPage.jsx
    ContactPage.jsx
  styles/
    index.css
  App.jsx
```

## Running locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Routes

- `/` Home
- `/about` About
- `/services` Services
- `/projects` Projects
- `/contact` Contact

## Contact form (EmailJS)

1. Create a `.env` file (see `.env.example`)
2. Add:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`

If these keys are not set, the UI will still render and will show a clear “not configured yet” message.

## Deploying on Render (static)

This repo includes `render.yaml` configured for Vite:

- Build: `npm install && npm run build`
- Publish directory: `dist`

SPA routing (no “Not Found” on refresh for `/contact`, etc.):

- **`render.yaml`** includes a `routes` rewrite: `/*` → `/index.html` (Render Blueprint).
- **`public/_redirects`** is copied into `dist/` for hosts that honor Netlify-style rules.

After changing `render.yaml`, sync the Blueprint in the Render dashboard (or redeploy) so rewrites apply.

