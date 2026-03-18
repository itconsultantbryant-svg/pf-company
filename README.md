# pf-company

# Power Factor Engineering & Consultancy Inc.

A modern, fully responsive website for **Power Factor Engineering & Consultancy Inc.**, delivering solar and electrical solutions across Liberia. Tagline: *Engineering With Integrity, Powering Sustainable Solutions.* Built with vanilla HTML, CSS, and JavaScript.

## Design

- **Style:** Clean, professional, futuristic energy-tech
- **Colors:** Deep blue, electric yellow, white, subtle gradients
- **Typography:** Poppins & Inter (Google Fonts)
- **Features:** Sticky nav, smooth scroll, hover effects, scroll reveal animations, animated counters, carousels, accordion FAQ, project filtering, solar package cards

## Pages

| Page            | File                | Description |
|-----------------|---------------------|-------------|
| Home            | `index.html`        | Hero “Our Absolute Best Solar Package”, intro, features, about, solar packages, why choose us, stats, testimonials, CTA |
| About           | `about.html`        | Trusted experts in Liberia, mission/vision/values, story, team, why choose us, certifications |
| Services        | `services.html`     | Electrical, AC, CCTV, Solar, Consultancy (full service list) |
| Solar Packages  | `solar-packages.html`| 2.3kW and 3.5kW packages with pricing |
| Projects        | `projects.html`     | Filterable gallery, featured projects, before/after, testimonials |
| Contact         | `contact.html`      | Contact form, Duazon/Paynesville addresses, phones, WhatsApp, map |
| FAQ             | `faq.html`          | Accordion FAQ |
| Blog            | `blog.html`         | Blog grid, sidebar, pagination UI |

## Navigation (all pages)

- Home → About → Services → Solar Packages → Projects → Blog → FAQ → Contact → Get Quote

## Contact (footer & contact page)

- **Locations:** Duazon, RIA Highway | GSA Junction, Paynesville City, Liberia
- **Phone:** +231 776 676 675 | +231 888 661 114
- **WhatsApp:** +231 889 469 956

## Running Locally

1. Open the project folder in a terminal.
2. Serve the site with any static server, for example:
   - **Python 3:** `python3 -m http.server 8080`
   - **Node (npx):** `npx serve .`
   - **VS Code:** Use the “Live Server” extension and open `index.html`.
3. Visit `http://localhost:8080` (or the port your server uses).

No build step or dependencies required.

## Structure

```
PowerFactorSite/
├── index.html          # Home
├── about.html
├── services.html
├── solar-packages.html # Solar packages (2.3kW, 3.5kW)
├── projects.html
├── contact.html
├── faq.html
├── blog.html
├── css/
│   └── styles.css     # Global styles, package cards, responsive
├── js/
│   └── main.js        # Nav, carousel, testimonials, counters, accordion, tabs, filters, forms
└── README.md
```

## Accessibility & Performance

- Semantic HTML and ARIA where needed (e.g. accordion, carousel).
- Smooth scroll and reduced motion respected via `prefers-reduced-motion` (can be added in CSS if desired).
- Images use Unsplash URLs; replace with your own and add `width`/`height` or `aspect-ratio` for best performance.
- Single CSS and JS file for fewer requests.

## Customization

- **Contact form / newsletter:** Hook `#contact-form` and `#newsletter-form` to your backend or form service.
- **Map:** Replace the `iframe` `src` in `contact.html` with your Google Maps embed URL for Paynesville/Duazon, Liberia.
- **Phone/WhatsApp:** Links use +231 numbers; update if needed.
- **Social links:** Set real URLs in footer `href`s.

---

© 2026 Power Factor. All rights reserved.
