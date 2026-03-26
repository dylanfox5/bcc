import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <p className="font-serif text-[11px] uppercase tracking-[0.18em] text-clay mb-4">
        Order Received
      </p>
      <h1 className="font-display text-4xl font-normal text-earth mb-4">
        Thank <em className="italic text-clay">you.</em>
      </h1>
      <p className="font-serif text-bark text-base leading-relaxed mb-10">
        Your order has been received. You&apos;ll hear from us soon.
      </p>
      <Link
        href="/gallery"
        className="font-serif text-[11px] uppercase tracking-[0.14em] text-clay border-b border-clay pb-0.5 hover:text-earth hover:border-earth transition-colors"
      >
        Continue browsing
      </Link>
    </div>
  );
}
