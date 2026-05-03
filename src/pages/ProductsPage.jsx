import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import { useCallback, useMemo, useRef, useState } from 'react';
import logoSrc from '../assets/enersource_logo.jpeg';
import Container from '../components/Container.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { useChatWidget } from '../context/ChatWidgetContext.jsx';
import { CATALOG_SECTIONS, PRODUCTS as products } from '../data/productsCatalog.js';
import { getProductThumbUrl } from '../data/productThumbs.js';

export default function ProductsPage() {
  const { notifyProductView } = useChatWidget();
  const [activeProductId, setActiveProductId] = useState(products[0]?.id ?? null);
  const detailAnchorRef = useRef(null);

  const activeProduct = useMemo(
    () => products.find((p) => p.id === activeProductId) ?? products[0],
    [activeProductId]
  );

  const selectProduct = useCallback(
    (product) => {
      setActiveProductId(product.id);
      notifyProductView(product.id, product.name);
      requestAnimationFrame(() => {
        detailAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    },
    [notifyProductView]
  );

  const productsBySection = useMemo(() => {
    const map = new Map(CATALOG_SECTIONS.map((s) => [s.id, []]));
    for (const p of products) {
      const list = map.get(p.catalogSection);
      if (list) list.push(p);
    }
    return CATALOG_SECTIONS.map((s) => ({ section: s, items: map.get(s.id) ?? [] }));
  }, [products]);

  const thumbUrl = activeProduct ? getProductThumbUrl(activeProduct.id) : null;

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
              <div className="mt-4 grid gap-6">
                {productsBySection.map(({ section, items }) =>
                  items.length ? (
                    <div key={section.id}>
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-primary/55">
                        {section.title}
                      </div>
                      <div className="mt-2 grid gap-3">
                        {items.map((product) => {
                          const isActive = activeProductId === product.id;
                          const t = getProductThumbUrl(product.id);
                          return (
                            <button
                              key={product.id}
                              type="button"
                              onClick={() => selectProduct(product)}
                              className={`rounded-2xl border p-3 text-left transition ${
                                isActive
                                  ? 'border-white/25 bg-primary text-white shadow-[0_2px_14px_rgba(198,40,40,0.35)]'
                                  : 'border-primary/15 bg-white text-primary hover:border-primary/30'
                              }`}
                            >
                              <div className="flex gap-3">
                                {t ? (
                                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/20 bg-white">
                                    <img
                                      src={t}
                                      alt=""
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </span>
                                ) : null}
                                <span className="min-w-0 flex-1">
                                  <div
                                    className={`text-[10px] font-extrabold uppercase tracking-wider ${
                                      isActive ? 'text-white/80' : 'text-primary/70'
                                    }`}
                                  >
                                    {product.category}
                                  </div>
                                  <div className="mt-0.5 font-heading text-xs font-extrabold leading-snug">
                                    {product.name}
                                  </div>
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </aside>

            <div className="space-y-5">
              <div ref={detailAnchorRef} className="scroll-mt-28">
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
                    <div className="w-full max-w-[220px] rounded-3xl border border-white/35 bg-white/95 p-4 shadow-xl">
                      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-inner">
                        {thumbUrl ? (
                          <img
                            src={thumbUrl}
                            alt=""
                            className="h-full w-full object-contain object-center"
                          />
                        ) : (
                          <div className="grid h-full min-h-[14rem] place-items-center text-xs font-semibold text-slate-400">
                            Preview
                          </div>
                        )}
                      </div>
                      <div className="mt-3 text-center text-[11px] font-extrabold uppercase leading-snug tracking-wider text-primary/85">
                        {activeProduct.imageCaption}
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
              </div>

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

              {products.length > 0 ? (
                <div className="rounded-3xl border border-primary/15 bg-white p-5 shadow-sm">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-primary/70">
                    Browse all products
                  </div>
                  <p className="mt-1 text-sm font-semibold text-slate-600">
                    Tap any image to switch products — same layout above (overview, details, datasheet). The current
                    item is highlighted.
                  </p>
                  <div className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] md:grid md:snap-none md:grid-cols-4 md:overflow-visible lg:grid-cols-5 xl:grid-cols-6 md:gap-3">
                    {products.map((product) => {
                      const t = getProductThumbUrl(product.id);
                      const isActive = activeProductId === product.id;
                      return (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => selectProduct(product)}
                          aria-pressed={isActive}
                          className={`group shrink-0 snap-start rounded-2xl border bg-white p-2 text-left shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 md:w-auto md:shrink ${
                            isActive
                              ? 'border-primary ring-2 ring-primary/40 ring-offset-2'
                              : 'border-primary/15 hover:border-primary/35 hover:shadow-md'
                          } w-[42vw] max-w-[9.5rem] sm:max-w-[10.5rem]`}
                        >
                          <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                            {t ? (
                              <img
                                src={t}
                                alt=""
                                className={`h-full w-full object-contain object-center transition ${isActive ? 'scale-[1.02]' : 'group-hover:scale-[1.02]'}`}
                              />
                            ) : (
                              <div className="grid h-full min-h-[5rem] place-items-center text-[10px] font-semibold text-slate-400">
                                Preview
                              </div>
                            )}
                            {isActive ? (
                              <span className="absolute bottom-1 left-1 rounded-md bg-primary px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-white shadow">
                                Viewing
                              </span>
                            ) : null}
                          </div>
                          <div className="mt-2 line-clamp-2 font-heading text-[11px] font-extrabold leading-snug text-primary">
                            {product.name}
                          </div>
                          <div className="mt-0.5 line-clamp-1 text-[10px] font-extrabold uppercase tracking-wider text-primary/55">
                            {product.category}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
