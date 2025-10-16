import React from 'react';
import { Link } from 'react-router-dom';

const services = [
  { name: 'SPROXIL SURVEY',
    slug: "sproxil-survey",
    desc: 'We capture real-time opinions from individuals and customers, even in remote areas. Transforming data points into powerful stories through fast responses, wide reach, and advanced real-time analytics.' 
  },
  { name: 'SPROXIL CHAMPION',
    slug: "sproxil-champion",
    desc: 'Sproxil Champion connects the brand with its consumers by ensuring consumer gratifying reward programs that spur consumers to promote a brand and stay loyal. By championing a brand, consumers can create more visibility for the brand.' 
  },
  { name: 'SPROXIL INFORMER',
    slug: "sproxil-informer",
    desc: 'A GS1 certified solution that secures a brand by providing robust tracking solutions that ensure a secure supply chain and end-to-end visibility. By tracing all activities using Sproxil Informer, a brand can maintain profits while sieving out fraudulent attempts' 
  },
  { name: 'SPROXIL ALLY',
    slug: "sproxil-ally",
    desc: 'Sproxil Ally provides a foolproof database of the company’s trade partners. Trade channels earn rewards for promoting a brand while the manufacturer is updated with partners’ progress and keeps them informed on new information.' 
  },
  { name: 'SPROXIL DEFENDER',
    slug: "sproxil-defender",
    desc: 'Sproxil Defender empowers consumers to purchase only anti-counterfeit products. By working closely with the manufacturer, products carry a unique code created by Sproxil to defend the brand from counterfeit attacks and trace counterfeit activities.'
  },
];

export default function Services() {
  return (
    <section
      id="testimonials"
      className="py-16 section-l-p section-r-p relative"
    >
      <div
        aria-hidden="true"
        className="gradient-bg absolute -bottom-20 -left-60 w-80 h-95 md:w-120 md:h-135 rounded-full blur-3xl opacity-30 md:opacity-35"
      />
      <div className="mx-auto relative z-10">
        <div className="section-title-div">
          <span className="text-[#4c4848] section-title">Our Core Products</span>
        </div>
        <h2 className="max-w-2xl text-black">We offer products to survey, track, engage, reward, and protect your brand.</h2>

        <div className="mt-12 grid grid-cols-1 ">
          {services.map((s) => (
            <div className='flex justify-between'>
              <div></div>
              <Link
                to={`/${s.slug}`}
                key={s.name}
                className="space-y-6 md:space-y-0 xl:w-[65%] 2xl:w-[55%] py-6 md:flex md:gap-x-20 items-center justify-between border-b-1 border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <div className='w-10 h-10 rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400'></div>
                  <h3 className="font-semibold text-2xl uppercase">{s.name}</h3>
                </div>
                <p className="text-lg text-[#484648] md:max-w-sm xl:max-w-md">{s.desc}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}