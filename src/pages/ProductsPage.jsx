import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import { useMemo, useState } from 'react';
import logoSrc from '../assets/enersource_logo.jpeg';
import Container from '../components/Container.jsx';
import PageHeader from '../components/PageHeader.jsx';

const products = [
  {
    id: 'enersource-eos15b',
    name: 'Enersource EOS15B Lithium Battery Energy Storage',
    category: 'Battery Storage',
    shortDescription:
      'High-capacity lithium battery storage designed for dependable backup and hybrid solar applications.',
    overview:
      'The Enersource EOS15B is an LFP battery storage solution engineered for long service life, stable performance, and flexible scaling in residential and commercial installations.',
    specs: [
      ['Model', 'SR-EOS15B'],
      ['Rated voltage', '51.2V'],
      ['Rated capacity', '314Ah'],
      ['Battery power', '16.07kWh'],
      ['Battery type', 'LFP'],
      ['Cycling lifespan', '8000 Cycles'],
      ['Lifetime', '20 Years'],
      ['Max. parallel capacity', '16']
    ],
    featureDetails: [
      'Built with lithium iron phosphate chemistry for improved thermal stability and long cycle life.',
      'Suitable for hybrid systems requiring reliable evening backup and daytime load optimization.',
      'Scalable architecture supports multiple units in parallel for larger energy storage requirements.',
      'Designed for consistent performance in demanding operating conditions.'
    ],
    applicationDetails: [
      'Residential solar storage for backup and load shifting.',
      'Commercial facilities seeking reduced generator runtime and improved uptime.',
      'Critical loads in clinics, offices, and education facilities.',
      'Hybrid systems paired with inverter and PV arrays.'
    ],
    datasheetPath: ''
  }
];

export default function ProductsPage() {
  const [activeProductId, setActiveProductId] = useState(products[0]?.id ?? null);
  const activeProduct = useMemo(
    () => products.find((p) => p.id === activeProductId) ?? products[0],
    [activeProductId]
  );

  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="Enersource engineered solar products and storage systems."
        subtitle="Select a product to view full technical details, use-case notes, and datasheet download options."
      />
      <section>
        <Container className="py-20">
          <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
            <aside className="rounded-3xl border border-primary/15 bg-white p-4 shadow-sm">
              <h2 className="font-heading text-base font-extrabold uppercase tracking-wider text-primary/80">
                Product Catalog
              </h2>
              <div className="mt-4 grid gap-3">
                {products.map((product) => {
                  const isActive = activeProductId === product.id;
                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => setActiveProductId(product.id)}
                      className={`rounded-2xl border p-4 text-left transition ${
                        isActive
                          ? 'border-white/25 bg-primary text-white shadow-[0_2px_14px_rgba(198,40,40,0.35)]'
                          : 'border-primary/15 bg-white text-primary hover:border-primary/30'
                      }`}
                    >
                      <div
                        className={`text-xs font-extrabold uppercase tracking-wider ${
                          isActive ? 'text-white/80' : 'text-primary/70'
                        }`}
                      >
                        Enersource
                      </div>
                      <div className="mt-1 font-heading text-sm font-extrabold">{product.name}</div>
                      <div
                        className={`mt-2 text-xs font-semibold ${
                          isActive ? 'text-white/85' : 'text-slate-700'
                        }`}
                      >
                        {product.category}
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className="space-y-5">
              <motion.article
                key={activeProduct.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="overflow-hidden rounded-3xl border border-primary/15 bg-white shadow-sm"
              >
                <div className="grid gap-0 lg:grid-cols-[320px_minmax(0,1fr)]">
                  <div className="relative flex min-h-[360px] items-center justify-center bg-gradient-to-br from-primary via-[#b91c1c] to-[#991b1b] p-6">
                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-white">
                      <img src={logoSrc} alt="" className="h-4 w-4 rounded-full object-cover" />
                      Enersource
                    </div>
                    <div className="w-full max-w-[180px] rounded-3xl border border-white/35 bg-white/90 p-4 shadow-xl">
                      <div className="h-56 rounded-2xl border border-slate-200 bg-white shadow-inner" />
                      <div className="mt-3 text-center text-[11px] font-extrabold uppercase tracking-wider text-primary/80">
                        Lithium Battery Energy Storage
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-primary via-[#b91c1c] to-[#991b1b] p-6 text-white">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-white/85">
                      Overview
                    </div>
                    <h3 className="mt-2 font-heading text-2xl font-extrabold">{activeProduct.name}</h3>
                    <p className="mt-3 max-w-3xl text-sm font-semibold leading-relaxed text-white/90">
                      {activeProduct.overview}
                    </p>

                    <div className="mt-6 grid gap-0 rounded-2xl border border-white/20 bg-white/8">
                      {activeProduct.specs.map(([label, value]) => (
                        <div
                          key={label}
                          className="grid grid-cols-1 gap-1 border-b border-white/15 px-4 py-3 last:border-b-0 sm:grid-cols-2"
                        >
                          <div className="text-sm font-semibold text-white/80">{label}</div>
                          <div className="text-xl font-extrabold text-white sm:text-right">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>

              <div className="grid gap-5 lg:grid-cols-2">
                <div className="rounded-3xl border border-primary/15 bg-white p-6 shadow-sm">
                  <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-primary/70">
                    <FileText className="h-4 w-4 text-gold" />
                    Product Description
                  </div>
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">
                    {activeProduct.shortDescription}
                  </p>
                  <ul className="mt-4 grid gap-2 text-sm font-semibold text-slate-700">
                    {activeProduct.featureDetails.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl border border-primary/15 bg-white p-6 shadow-sm">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-primary/70">
                    Applications & Downloads
                  </div>
                  <ul className="mt-4 grid gap-2 text-sm font-semibold text-slate-700">
                    {activeProduct.applicationDetails.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {activeProduct.datasheetPath ? (
                    <a
                      href={activeProduct.datasheetPath}
                      download
                      className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/25 bg-primary px-5 py-3 text-sm font-extrabold text-white shadow-[0_2px_14px_rgba(198,40,40,0.35)] transition hover:brightness-110"
                    >
                      <Download className="h-4 w-4" />
                      Download Datasheet
                    </a>
                  ) : (
                    <div className="mt-6 rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm font-semibold text-primary/80">
                      Datasheet file path not linked yet. Add PDF files to
                      `src/assets/Product_Data_Sheet` and map each product to enable direct downloads.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
