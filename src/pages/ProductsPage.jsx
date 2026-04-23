import Container from '../components/Container.jsx';
import PageHeader from '../components/PageHeader.jsx';

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="Solar products are coming soon."
        subtitle="We will publish our product catalog here soon, including specifications, package options, and availability."
      />
      <section>
        <Container className="py-20">
          <div className="rounded-3xl border border-primary/15 bg-white p-8 shadow-sm">
            <h2 className="font-heading text-2xl font-extrabold text-primary">
              Product catalog in progress
            </h2>
            <p className="mt-3 max-w-3xl text-base font-semibold leading-relaxed text-slate-700">
              This page is ready for product entries. Share the items anytime and I will add structured
              product cards with pricing, specs, and call-to-action buttons.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
