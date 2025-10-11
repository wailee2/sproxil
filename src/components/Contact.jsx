import React, { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      // Replace endpoint with your secure server endpoint.
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Network response was not ok');
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="bg-white py-16">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-slate-900">Contact us</h2>
        <p className="mt-2 text-slate-600">Ready to secure your brand? Send us a message and we’ll get back within 1 business day.</p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="sr-only">Name</span>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className="w-full rounded-md border px-3 py-2" />
            </label>
            <label className="block">
              <span className="sr-only">Email</span>
              <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@company.com" className="w-full rounded-md border px-3 py-2" />
            </label>
          </div>

          <label>
            <span className="sr-only">Message</span>
            <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell us about your project" className="w-full rounded-md border px-3 py-2" />
          </label>

          <div className="flex items-center gap-4">
            <button type="submit" className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white">Send Message</button>
            {status === 'loading' && <span className="text-sm text-slate-600">Sending...</span>}
            {status === 'success' && <span className="text-sm text-green-600">Message sent — thanks!</span>}
            {status === 'error' && <span className="text-sm text-red-600">Failed to send. Try again later.</span>}
          </div>
        </form>

        <div className="mt-8 text-sm text-slate-600">
          <p><strong>Email:</strong> hello@maiway.example</p>
          <p className="mt-1"><strong>Address:</strong> Lagos, Nigeria</p>
        </div>
      </div>
    </section>
  );
}