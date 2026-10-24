"use client";

import { useState, FormEvent } from "react";
import { AddressFields, ShippingFormData } from "@/lib/types";

const inputClass =
  "w-full bg-parchment border border-earth/20 px-3 py-2.5 font-serif text-sm text-earth placeholder:text-mist focus:outline-none focus:border-clay transition-colors duration-200";

const labelClass = "block font-serif text-[10px] uppercase tracking-[0.14em] text-mist mb-1.5";

const EMPTY_ADDRESS: AddressFields = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "US",
};

function AddressFieldset({
  values,
  onChange,
}: {
  values: AddressFields;
  onChange: (fields: AddressFields) => void;
}) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange({ ...values, [e.target.name]: e.target.value });
  }

  return (
    <div className="space-y-4">
      <div>
        <label className={labelClass}>Full name</label>
        <input
          name="name" type="text" required
          value={values.name} onChange={handleChange}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Address line 1</label>
        <input
          name="line1" type="text" required
          value={values.line1} onChange={handleChange}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Address line 2 (optional)</label>
        <input
          name="line2" type="text"
          value={values.line2} onChange={handleChange}
          className={inputClass}
        />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>City</label>
          <input
            name="city" type="text" required
            value={values.city} onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>State</label>
          <input
            name="state" type="text" required
            value={values.state} onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>ZIP</label>
          <input
            name="postalCode" type="text" required
            value={values.postalCode} onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
}

export default function ShippingAddressForm({
  onSubmit,
}: {
  onSubmit: (data: ShippingFormData) => void;
}) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState<AddressFields>(EMPTY_ADDRESS);
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [billingAddress, setBillingAddress] = useState<AddressFields>(EMPTY_ADDRESS);
  const [notes, setNotes] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      email,
      phone,
      shippingAddress,
      billingSameAsShipping,
      billingAddress: billingSameAsShipping ? shippingAddress : billingAddress,
      notes,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-sand border border-earth/10 p-6 space-y-6">
      <div>
        <h3 className="font-serif text-[10px] uppercase tracking-[0.18em] text-mist mb-4">
          Contact
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} htmlFor="email">Email</label>
            <input
              id="email" type="email" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="phone">Phone</label>
            <input
              id="phone" type="tel"
              value={phone} onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-serif text-[10px] uppercase tracking-[0.18em] text-mist mb-4">
          Shipping address
        </h3>
        <p className="font-serif text-mist text-xs leading-relaxed mb-4">
          Sending this as a gift? Use the recipient&apos;s name and address here.
        </p>
        <AddressFieldset values={shippingAddress} onChange={setShippingAddress} />
      </div>

      <div>
        <label className="flex items-center gap-2 cursor-pointer mb-4">
          <input
            type="checkbox"
            checked={!billingSameAsShipping}
            onChange={(e) => setBillingSameAsShipping(!e.target.checked)}
            className="accent-clay"
          />
          <span className="font-serif text-xs text-bark">
            Billing address is different from shipping address
          </span>
        </label>

        {!billingSameAsShipping && (
          <div>
            <h3 className="font-serif text-[10px] uppercase tracking-[0.18em] text-mist mb-4">
              Billing address
            </h3>
            <AddressFieldset values={billingAddress} onChange={setBillingAddress} />
          </div>
        )}
      </div>

      <div>
        <label className={labelClass} htmlFor="notes">Notes (optional)</label>
        <textarea
          id="notes" rows={3}
          value={notes} onChange={(e) => setNotes(e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-black text-parchment font-serif text-[11px] uppercase tracking-[0.16em] px-6 py-4 hover:bg-clay transition-colors duration-300"
      >
        Continue to Payment
      </button>
    </form>
  );
}
