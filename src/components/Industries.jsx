import React from 'react';

const items = [
  { title: 'Donors', desc: 'Empowering NGOs with data needed to optimize distribution and make impact.' },
  { title: 'Pharma', desc: 'Protecting drug authenticity and patient safety with anti-counterfeit solutions.' },
  { title: 'Beverage', desc: 'Ensuring beverage authenticity and driving consumer engagement.' },
  { title: 'FMCG', desc: 'Safeguarding supply chains and enhancing brand loyalty within the FMCG sector.' },
  { title: 'Cosmetics', desc: 'Securing cosmetic brands with reliable product verification solution.' },
  { title: 'Automotive', desc: 'Authenticating automotive parts for safety and quality assurance to improve loyalty.' },
];

export default function Industries() {
  return (
    <section id="industries" className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-slate-900">Industries we serve</h2>
        <p className="mt-2 text-slate-600 max-w-2xl">Our solutions are tailored to the unique needs of our customers.</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <article key={it.title} className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-medium text-slate-900">{it.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{it.desc}</p>
              <a href="#contact" className="mt-4 inline-block text-sm font-semibold text-green-600">Read More →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}