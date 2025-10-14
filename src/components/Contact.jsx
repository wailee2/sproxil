import React/*, { useState }*/ from 'react';
import AnimatedArrowButton from './ui/AnimatedArrowButton';

export default function Contact() {
  {/** 
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
  }*/}

  return (
    <section
      id="contact"
      className="py-16 section-l-p section-r-p"
    >
      <div className="mx-auto px-8 md:px-10 lg:px-20 py-30 xl:py-56 rounded-xl section-bg overflow-hidden relative">
        <div
          aria-hidden="true"
          className="gradient-bg rotate-40 rounded-full absolute bottom-25 sm:bottom-0 -right-25 sm:-right-35 w-110 h-50 sm:w-150 sm:h-90 lg:w-230 lg:h-130 blur-2xl sm:blur-3xl opacity-75"
        />
        <div className='relative z-10'>
          <h1 className="lg:max-w-[85%] text-[#f5f9f5] sansation-bold">
            Ready to secure your brand?
          </h1>

          <div className="mt-10 lg:mt-12">
            <AnimatedArrowButton
              label="Book an Appointment"
              to="/form"
              labelClass="bg-[#f5f9f5] text-[#0a0f0a]"
              iconTextColor="text-red-950"
            />
          </div>

          {/** 
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
          </form>*/}
        </div>
      </div>
    </section>
  );
}