"use client";

import { useState, FormEvent } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { LocalDeliveryFormData } from "@/lib/types";

const inputClass =
  "w-full bg-parchment border border-earth/20 px-3 py-2.5 font-serif text-sm text-earth placeholder:text-mist focus:outline-none focus:border-clay transition-colors duration-200";

const labelClass = "block font-serif text-[10px] uppercase tracking-[0.14em] text-mist mb-1.5";

export default function LocalDeliveryForm() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<LocalDeliveryFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, items }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(`Submission failed: ${data.error ?? "Unknown error"}`);
        return;
      }

      clearCart();
      router.push("/checkout/success");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-sand border border-earth/10 p-6 space-y-5">
      <p className="font-serif text-bark text-sm leading-relaxed">
        Fill in your details and we&apos;ll reach out to arrange pickup or local delivery.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="name">Name</label>
          <input
            id="name" name="name" type="text" required
            value={formData.name} onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">Email</label>
          <input
            id="email" name="email" type="email" required
            value={formData.email} onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="phone">Phone</label>
        <input
          id="phone" name="phone" type="tel"
          value={formData.phone} onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="address">Address</label>
        <input
          id="address" name="address" type="text"
          value={formData.address} onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="notes">Notes (optional)</label>
        <textarea
          id="notes" name="notes" rows={3}
          value={formData.notes} onChange={handleChange}
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-black text-parchment font-serif text-[11px] uppercase tracking-[0.16em] px-6 py-4 hover:bg-clay transition-colors duration-300 disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit Order Request"}
      </button>
    </form>
  );
}
