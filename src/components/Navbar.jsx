import React, { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-white/80 backdrop-blur sticky top-0 z-40 shadow-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">M</div>
            <span className="text-lg font-semibold text-slate-900">MaiWay</span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#industries" className="text-sm font-medium text-slate-700 hover:text-slate-900">Industries</a>
            <a href="#testimonials" className="text-sm font-medium text-slate-700 hover:text-slate-900">Testimonials</a>
            <a href="#contact" className="text-sm font-medium text-slate-700 hover:text-slate-900">Contact</a>
            <a href="#" className="ml-2 inline-block rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow">Get Started</a>
          </nav>

          {/* mobile */}
          <div className="md:hidden">
            <button
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                {open ? (
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden border-t">
          <div className="space-y-2 px-6 py-4">
            <a href="#industries" className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50">Industries</a>
            <a href="#testimonials" className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50">Testimonials</a>
            <a href="#contact" className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50">Contact</a>
            <a href="#" className="block rounded-md bg-green-600 px-3 py-2 text-base font-semibold text-white">Get Started</a>
          </div>
        </div>
      )}
    </header>
  );
}