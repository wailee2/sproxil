import React from 'react';
import InfiniteCarousel from './ui/InfiniteCarousel';

const partners = [
  {
    name: 'Rainoil',
    quote:
      'We now have deep visibility into our customer experiences and what they think about our products and services not just at our stations but also our depo. This will greatly impact our business intelligence for 2025.',
    image: '/rainoil.png',
  },
  {
    name: 'WWCVL',
    quote:
      'We have been using Sproxil for over five years now. We are confident in their solution and include them in our marketing campaigns and brand protection efforts.',
    image:
      '/wwcvl.png',
  },
  {
    name: 'Diageo',
    quote:
      'During this campaign, Diageo was able to identify through the Sproxil platform 15,000 influencers in the specific geographic area. As a result of the promotion Diageo saw growth in its market share in one of the target states by 2025.',
    image:
      '/diageo.png',
  },
];

export default function Partners() {
    return (
        <section
            id="partners"
            className="py-16 pb-100 section-l-p section-r-p section-bg relative overflow-hidden rounded-xl"
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
                <div className=''>
                    <div className="section-title-div">
                        <span className="text-[#929292] section-title ">Our Partners</span>
                    </div>
                    <h2 className="max-w-lg text-white">Our platform is trusted by 200+ global brands.</h2>
                    <p className='mt-5 lg:mt-7 text-[#929292] text-[16px] sm:text-lg lg:text-xl max-w-md'>
                        We secure supply chains and power consumer engagement.
                    </p>
                </div>
                <div className='bg-amber-500'>
                    <InfiniteCarousel
                        speed={180}
                        direction="left"
                        onScrollUp="right"
                        onScrollDown="left"
                        pauseOnHover={true}
                        className="py-6 "
                        >
                        {partners.map((p) => (
                            <div
                                key={p.name}
                                className='bg-green-700 w-50'
                            >
                                <img
                                    src={p.image}
                                    alt={`partner-${p.id}`}
                                    loading="lazy"
                                    className=" w-full h-28 sm:h-32 md:h-40 object-contain"
                                />
                            </div>
                        ))}
                    </InfiniteCarousel>
                </div>
            </div>
        </section>
    );
}