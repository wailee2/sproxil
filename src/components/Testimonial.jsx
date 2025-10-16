import React from 'react'
import CardSwap, { Card } from './ui/CardSwap'

// Update the `quotes` array to include an `image` field for each person.
// Replace the image URLs with your real assets (e.g. `/images/testimonials/aisha.jpg`).
const quotes = [
  {
    name: 'Rainoil',
    quote:
      'We now have deep visibility into our customer experiences and what they think about our products and services not just at our stations but also our depo. This will greatly impact our business intelligence for 2025.',
    image:
      '/testimonial/rainoil.png',
  },
  {
    name: 'WWCVL',
    quote:
      'We have been using Sproxil for over five years now. We are confident in their solution and include them in our marketing campaigns and brand protection efforts.',
    image:
      '/testimonial/wwcvl.png',
  },
  {
    name: 'Diageo',
    quote:
      'During this campaign, Diageo was able to identify through the Sproxil platform 15,000 influencers in the specific geographic area. As a result of the promotion Diageo saw growth in its market share in one of the target states by 2025.',
    image:
      '/testimonial/diageo.png',
  },
  {
    name: 'Bliss GVS',
    quote:
      ' The response from consumers was enthusiastic. Thousands of calls were made to the help desk, some of which helped us identify counterfeit Ampiclox blisters.',
    image:
      '/testimonial/gsk_logo.jpg',
  },
  {
    name: 'Juanco',
    quote:
      'When Juanco learned that their products were being counterfeited. Sproxil mobile phone-based solution helped us quickly protect over 4000 farmers.',
    image:
      '/testimonial/juanco.jpg',
  },
  {
    name: 'Saint Gobain',
    quote:
      ' With Ally, we have been able to reach more contractors, provide new leads and better Saint-Gobain contact with contractors',
    image:
      '/testimonial/saint.png',
  },
  {
    name: 'Barcardi',
    quote:
      ' We met our goal to increase cocktail orders by 300% and connect directly with thousands of bartenders.',
    image:
      '/testimonial/bacardi.jpg',
  },
]

export default function Testimonial() {
  return (
    <section id="testimonials" className="py-16 section-l-p overflow-x-hidden">
      <div className="mx-auto overflow-hidden lg:flex justify-between space-y-10">
        <div className=''>
          <div className="section-title-div">
            <span className="text-[#4c4848] section-title">Testimonials</span>
          </div>

          <h2 className="max-w-2xl text-black">Don't take our word for it!</h2>
          <h2 className="max-w-2xl text-black"> Hear it from our customers.</h2>
        </div>

        {/* Static grid of testimonial cards (responsive). 
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {quotes.map((q) => (
            <article
              key={q.name}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
              aria-labelledby={`t-${q.name.replace(/\s /g, '-')}`}
            >
              <div className="flex items-start gap-4">
                <img
                  src={q.image}
                  alt={`${q.name} avatar`}
                  className="w-16 h-16 rounded-full object-cover border-2 border-green-200"
                  loading="lazy"
                />
                <div>
                  <h3 id={`t-${q.name.replace(/\s /g, '-')}`} className="font-semibold">
                    {q.name}
                  </h3>
                  <p className="text-sm mt-1 text-gray-600">{q.role}</p>
                </div>
              </div>

              <blockquote className="mt-4 text-gray-800 italic">“{q.quote}”</blockquote>

              <div className="mt-4">
                <button
                  className="text-sm font-medium px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 hover:scale-105 transition-transform duration-150"
                  aria-label={`Contact ${q.name}`}
                >
                  View story
                </button>
              </div>
            </article>
          ))}
        </div>*/}

        <div className=''>
          {/* Animated stacked cards using CardSwap. These will use the same `quotes` array. */}
          <div className=" h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] relative overflow-hidden lg:overflow-visible" >
            <CardSwap
              cardDistance={60}
              verticalDistance={70}
              delay={5000}
              pauseOnHover={false}
              skewAmount={3}
              easing="elastic"
              width={450}
              height={410}
            >
              {quotes.map((q) => (
                <Card key={q.name} className="bg-gray-200 bg-red-600m p-8 rounded-2xl shadow-lg border border-gray-100 max-w-md space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={q.image}
                      alt={`${q.name} logo`}
                      className="w-14 h-14 lg:w-16 lg:h-16 rounded-full object-contain p-1 bg-white"
                      loading="lazy"
                    />
                    <div>
                      <span className="font-semibold text-[16px] text-[#161c12]">{q.name}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-[#2d2f2d] text-pretty tracking-[-0.0275rem] text-xl/[125%] lg:text-2xl font-semibold">
                    “{q.quote}”
                  </p>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  )
}
