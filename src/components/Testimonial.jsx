import React from 'react';

const quotes = [
  { name: 'Aisha Bello', role: 'Supply Chain Manager, FMCG', quote: 'MaiWay helped us reduce counterfeits and restored consumer confidence in three months.' },
  { name: 'Dr. Emeka', role: 'Head of Quality, Pharma', quote: 'Seamless verification—patients now trust our packaging labels.' },
  { name: 'Ngozi Okoro', role: 'Program Lead, NGO', quote: 'Accurate distribution data means aid reaches who needs it most.' },
];

export default function Testimonial() {
  return (
    <section id="testimonials" className="py-16">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-slate-900">What our partners say</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {quotes.map((q) => (
            <blockquote key={q.name} className="rounded-xl border bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-700">“{q.quote}”</p>
              <footer className="mt-4 text-xs text-slate-500">— {q.name}, <span className="text-slate-600">{q.role}</span></footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}