import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import AnimatedArrowButton from './ui/AnimatedArrowButton';
import { useLenis } from "../LenisProvider"; // <- import the hook from your provider (see earlier)

import { BiSolidDonateHeart } from "react-icons/bi";
import { LuBriefcaseMedical } from "react-icons/lu";
import { RiDrinks2Line } from "react-icons/ri";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { FaCarAlt } from "react-icons/fa";
import { RiUserCommunityFill } from "react-icons/ri";

const items = [
  {
    title: "Donors",
    desc: "Empowering NGOs with data needed to optimize distribution and make impact.",
    slug: "donors",
    image: "/images/industries/donors.jpg",
    icon: <BiSolidDonateHeart />,
  },
  {
    title: "Pharma",
    desc: "Protecting drug authenticity and patient safety with anti-counterfeit solutions.",
    slug: "pharma",
    image: "/images/industries/pharma.jpg",
    icon: <LuBriefcaseMedical />,
  },
  {
    title: "Beverage",
    desc: "Ensuring beverage authenticity and driving consumer engagement.",
    slug: "beverage",
    image: "/images/industries/beverage.jpg",
    icon: <RiDrinks2Line />,
  },
  {
    title: "FMCG",
    desc: "Safeguarding supply chains and enhancing brand loyalty within the FMCG sector.",
    slug: "fmcg",
    image: "/images/industries/fmcg.jpg",
    icon: <RiUserCommunityFill />,
  },
  {
    title: "Cosmetics",
    desc: "Securing cosmetic brands with reliable product verification solution.",
    slug: "cosmetics",
    image: "/images/industries/cosmetics.jpg",
    icon: <HiOutlinePaintBrush />,
  },
  {
    title: "Automotive",
    desc: "Authenticating automotive parts for safety and quality assurance to improve loyalty.",
    slug: "automotive",
    image: "/images/industries/automotive.jpg",
    icon: <FaCarAlt />,
  },
];

function clamp(v, a = 0, b = 1) {
  return Math.max(a, Math.min(b, v));
}

export default function Industries() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(1);
  const lenis = useLenis();

  useEffect(() => {
    // Handler that computes progress from getBoundingClientRect
    const compute = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const start = viewportHeight;
      const top = rect.top;
      const raw = top / start;
      const p = clamp(raw, 0, 1);
      setProgress(p);
    };

    // If we have a Lenis instance, subscribe to its scroll event (fires each RAF tick)
    if (lenis && typeof lenis.on === "function") {
      lenis.on("scroll", compute);
      // run once to initialize
      compute();
      return () => {
        lenis.off("scroll", compute);
      };
    }

    // Fallback: if no Lenis, use RAF loop to compute each frame (still smooth)
    let raf = null;
    const loop = () => {
      compute();
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [lenis]);

  const mx = `${6 * progress}%`;
  const my = `${9 * progress}%`;

  // compute a scaleX that emulates symmetric left/right margins but uses transform
  const mxPercent = 6 * progress; // same numbers you used
  const totalShrink = 2 * mxPercent; // left+right
  const scaleX = 1 - totalShrink / 100; // scaleX value between ~0.88 and 1


  return (
    <section ref={ref} className="relative" id="industries">
      <div
        aria-hidden="true"
        className="gradient-bg absolute -top-70 lg:-top-100 -left-70 w-120 h-150 lg:w-190 lg:h-190 rounded-full blur-3xl opacity-15"
      />
      <div
        className="relative overflow-hidden section-bg section-l-p section-r-p  py-12 lg:py-20 rounded-xl"
        style={{
          marginLeft: mx, marginRight: mx, marginTop:my,
          transform: `scaleX(${scaleX}) translateZ(0)`, // GPU-accelerated
          transformOrigin: "center center",
          transitiwon: "transform 200ms linear", // small duration for smooth interpolation
          willChange: "transform",
        }}
      >
        {/* corner glows (pointer-events-none so they don't intercept clicks) */}
        <div
          aria-hidden="true"
          className="gradient-bg absolute -top-36 -right-16 lg:-right-36 w-100 h-100 lg:w-130 lg:h-110 rounded-full blur-3xl opacity-55"
        />
        <div
          aria-hidden="true"
          className="gradient-bg absolute -bottom-70 -right-16 lg:right-15 w-120 h-120 lg:w-130 lg:h-110 rounded-full blur-3xl opacity-75"
        />
        
        
        <div className="mx-auto relative z-10">
          <div className="section-title-div">
            <span className="text-[#929292] section-title">Industries we serve</span>
          </div>
          <h2 className="max-w-lg text-white">Our solutions are tailored to the unique needs of our customers.</h2>

          <div className="mt-7 md:mt-10 lg:mt-12 grid gap-5 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it) => (
              <Link
                to={`/${it.slug}`}
                key={it.title}
                className="rounded-lg bg-[#272525] p-6 md:p-10 cursor-pointer flex flex-col gap-8"
              >
                <div className="text-7xl text-[#f5f9f5]">{it.icon}</div>{/** 
                <div className="w-full overflow-hidden rounded-md">
                  <img
                    src={it.image}
                    alt={`${it.title} illustration`}
                    loading="lazy"
                    className="w-20 xl:w-24 object-cover"
                  />
                </div>*/}
                <div className="flex flex-col gap-3">
                  <h3 className="text-[22px] md:text-[28px] font-medium text-[#f5f9f5]">{it.title}</h3>
                  <p className="text-[#a7aaa7] text-[16px] md:text-[18px] xl:text-[20px]">{it.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <AnimatedArrowButton
              label="Learn more about our solutions"
              to="#contact"
              labelClass="bg-[#f5f9f5] text-[#0a0f0a]"
              iconTextColor="text-red-950"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
