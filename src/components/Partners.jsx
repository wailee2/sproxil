import React from 'react';
import InfiniteCarousel from './ui/InfiniteCarousel';

const partnersRowA = [
  {
    name: 'Saint-Gobain',
    image: '/saint-white.png',
  },
  {
    name: 'WWCVL',
    image: '/wwcvl-white.png',
  },
  {
    name: 'Diageo',
    image: '/diageo-white.png',
  },
  {
    name: 'Swipha',
    image: '/swipha-white.png',
  },
  {
    name: 'FUCHS',
    image: '/fuchs-white.png',
  },
  {
    name: 'Norvartis',
    image: '/novartis-white.png',
  },
];
const partnersRowB = [
  {
    name: 'Bliss',
    image: '/bliss-white.png',
  },
  {
    name: 'Shalina',
    image: '/sha-white.png',
  },
  {
    name: 'Fonterra',
    image: '/fonterra-white.png',
  },
  {
    name: 'GSK',
    image: '/gsk-white.png',
  },
  {
    name: 'DNI',
    image: '/dni-white.png',
  }
];

export default function Partners() {
  return (
    <section
      id="partners"
      className="py-17 section-bg relative overflow-hidden rounded-xl"
    >
      <div
        aria-hidden="true"
        className="gradient-bg rotate-30 absolute -top-60 sm:-top-50 right-0 w-80 h-80 sm:w-90 sm:h-90 blur-2xl opacity-75"
      />
      <div
        aria-hidden="true"
        className="gradient-bg rounded-full absolute top-80 -left-45 w-120 h-120 sm:w-90 sm:h-90 blur-2xl opacity-55"
      />
        
      <div className="mx-auto rounded-xl  overflow-hidden relative z-10">
        <div className='section-l-p section-r-p'>
          <div className="section-title-div">
            <span className="text-[#929292] section-title ">Our Partners</span>
          </div>
          <h2 className="max-w-lg text-white">Our platform is trusted by 200+ global brands.</h2>
          <p className='mt-5 lg:mt-7 text-[#929292] text-[16px] sm:text-lg lg:text-xl max-w-md'>
            We secure supply chains and power consumer engagement.
          </p>
        </div>
        <div className='space-y-5 mt-10'>
          <InfiniteCarousel
            speed={180}
            direction="left"
            onScrollUp="right"
            onScrollDown="left"
            pauseOnHover={false}
            className=""
            >
            {partnersRowA.map((p) => (
              <div
                key={p.name}
                className='partner-div'
              >
                <img
                  src={p.image}
                  alt={`${p.name} logo`}
                  loading="lazy"
                  className=" partner-img"
                />
              </div>
            ))}
          </InfiniteCarousel>
          <InfiniteCarousel
            speed={180}
            direction="right"
            onScrollUp="left"
            onScrollDown="right"
            pauseOnHover={false}
            className=""
            >
            {partnersRowB.map((p) => (
              <div
                key={p.name}
                className='partner-div'
              >
                <img
                  src={p.image}
                  alt={`partner-${p.id}`}
                  loading="lazy"
                  className="partner-img"
                />
              </div>
            ))}
          </InfiniteCarousel>
        </div>
      </div>
    </section>
  );
}