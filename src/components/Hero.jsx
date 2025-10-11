import React from 'react';

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
          <div>
            <p className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">For Donors • Pharma • FMCG</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              W
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-xl">Secure product verification, protect supply chains, and turn each mobile scan into a trusted connection between your brand and customers.</p>

            <div className="mt-8 flex gap-4">
              <a href="#contact" className="inline-flex items-center rounded-md bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow">Talk to Sales</a>
              <a href="#industries" className="inline-flex items-center rounded-md border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700">See Industries</a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="text-sm text-slate-600">
                <div className="font-semibold text-slate-900">99.9%</div>
                <div>Uptime</div>
              </div>
              <div className="text-sm text-slate-600">
                <div className="font-semibold text-slate-900">50+</div>
                <div>Brands Served</div>
              </div>
              <div className="text-sm text-slate-600">
                <div className="font-semibold text-slate-900">2M+</div>
                <div>Verifications</div>
              </div>
              <div className="text-sm text-slate-600">
                <div className="font-semibold text-slate-900">PCI & ISO</div>
                <div>Compliant</div>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="w-full max-w-md rounded-xl border p-6 shadow-lg">
              <div className="mb-4 text-sm font-medium text-slate-700">Live demo</div>
              <div className="h-64 w-full rounded-md bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="opacity-40">
                  <path d="M12 2v20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
                </svg>
              </div>
              <p className="mt-4 text-sm text-slate-600">Scan a product, verify authenticity, and display custody details to the consumer — all in seconds.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}