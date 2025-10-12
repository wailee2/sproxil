import React from 'react';

const services = [
  { name: 'SPROXIL SURVEY',
    title: '',
    desc: 'We capture real-time opinions from individuals and customers, even in remote areas. Transforming data points into powerful stories through fast responses, wide reach, and advanced real-time analytics.' 
  },
  { name: 'SPROXIL CHAMPION',
    title: '',
    desc: 'Sproxil Champion connects the brand with its consumers by ensuring consumer gratifying reward programs that spur consumers to promote a brand and stay loyal. By championing a brand, consumers can create more visibility for the brand.' 
  },
  { name: 'SPROXIL INFORMER',
    title: '',
    desc: 'A GS1 certified solution that secures a brand by providing robust tracking solutions that ensure a secure supply chain and end-to-end visibility. By tracing all activities using Sproxil Informer, a brand can maintain profits while sieving out fraudulent attempts' 
  },
  { name: 'SPROXIL ALLY',
    title: '',
    desc: 'Sproxil Ally provides a foolproof database of the company’s trade partners. Trade channels earn rewards for promoting a brand while the manufacturer is updated with partners’ progress and keeps them informed on new information.' 
  },
  { name: 'SPROXIL DEFENDER',
    title: '',
    desc: 'Sproxil Defender empowers consumers to purchase only anti-counterfeit products. By working closely with the manufacturer, products carry a unique code created by Sproxil to defend the brand from counterfeit attacks and trace counterfeit activities.'
  },
];

export default function Services() {
  return (
    <section
      id="testimonials"
      className="py-16 section-x-padding overflow-x-hidden"
    >
      <div className="mx-auto">
        <div className="section-title-div">
          <span className="text-[#4c4848] section-title">Our Core Services</span>
        </div>
        <h2 className="max-w-2xl text-black">We offer solutions to survey, track, engage, reward, and protect your brand.</h2>

        <div className="mt-12 grid grid-cols-1 ">
          {services.map((s) => (
            <div className='flex justify-between'>
              <div></div>
              <div key={s.name} className=" xl:w-[85%] py-6 flex flex-wrap gap-5 md:gap-20 items-center justify-between border-b-1 border-gray-200">
                <div className="flex items-center gap-3">
                  <div className='w-10 h-10 rounded-full bg-gradient-to-r from-red-600  to-white'></div>
                  <h3 className="font-semibold text-2xl uppercase">{s.name}</h3>
                </div>
                <p className="text-lg text-[#484648] md:max-w-sm">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}