import React from "react";
import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function AnimatedArrowButton({
  label = null,
  to = null,
  onClick = undefined,
  durationClass = "duration-500",
  exitTranslate = "translate-x-6 -translate-y-6",
  incomingFrom = "-translate-x-6 -rotate-12",
  className = "",
  children = null,
  ariaLabel = "",
    scrollOffset = 0,
}) {
  const outer = `group inline-flex items-center gap-3 ${className}`.trim();

  // animation classes for the inner icon wrapper only
  const iconAnim = `transform transition-all ${durationClass} ease-in-out`;

  // ORIGINAL diagonal arrow: stays centered initially; on group-hover moves up-right and fades out
  const originalIconCls = `${iconAnim} -rotate-45 opacity-100 group-hover:${exitTranslate} group-hover:opacity-0`;

  // INCOMING arrow: starts off to the left & tilted; on hover slides to center and rotates to 0deg and becomes visible
  const incomingIconCls = `${iconAnim} ${incomingFrom} opacity-0 group-hover:translate-x-0 group-hover:rotate-0 group-hover:opacity-100`;

  // Smooth-scroll handler for hash links (#id)
  function handleHashClick(e, hash) {
    // allow regular onClick behavior if user provided and wants it (still call scroll)
    if (e) e.preventDefault();

    const id = hash.startsWith("#") ? hash.slice(1) : hash;
    // try by id first, then by name attribute
    const target =
      document.getElementById(id) || document.querySelector(`[name="${id}"]`);

    if (!target) {
      // fallback to normal anchor behavior if element not found
      window.location.hash = hash;
      return;
    }

    // compute target position with optional offset (for fixed headers)
    const targetY = target.getBoundingClientRect().top + window.pageYOffset - (scrollOffset || 0);

    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: "smooth",
    });

    // if the consumer also provided an onClick prop, call it
    if (typeof onClick === "function") onClick();
  }
  
  const content = (
    <>
      {/* optional label/button (left). It reacts to the group's hover state. */}
      {label && !children && (
        <button
          type={to ? undefined : "button"}
          className={
            "inline-flex items-center rounded-full bg-red-950 px-5.5 py-3.5 text-lg font-semibold text-white shadow transition-transform duration-200" +
            " cursor-pointer"
          }
          onClick={(e) => {
            if (to && typeof to === "string" && to.startsWith("#")) {
              handleHashClick(e, to);
            } else if (!to && typeof onClick === "function") {
              onClick(e);
            }
          }}
          aria-label={ariaLabel}
        >
          {label}
        </button>
      )}

      {children}

      {/* the single static circle with overflow-hidden */}
      <div className='p-7 rounded-full text-[1.7rem] bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-red-950 shadow-md  flex items-center justify-center relative overflow-hidden' aria-hidden={false}>
        {/* original arrow — inner wrapper animates */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-12">
          <span className={originalIconCls}>
            <IoArrowForward className="text-[1.7rem] text-red-950" />
          </span>
        </div>

        {/* incoming arrow — layered above original */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className={incomingIconCls}>
            <IoArrowForward className="text-[1.7rem] text-red-950" />
          </span>
        </div>
      </div>
    </>
  );

  if (to && typeof to === "string" && to.startsWith("#")) {
    return (
      <a
        href={to}
        className={outer}
        aria-label={ariaLabel}
        onClick={(e) => handleHashClick(e, to)}
      >
        {content}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={outer} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button className={outer} onClick={onClick} aria-label={ariaLabel}>
      {content}
    </button>
  );
}

/*
Usage:
<AnimatedArrowButton label="Get Started" to="/signup" />
*/

//bg-[radial-gradient(circle_at_center,_#dc2626,_#fb923c,_#f59e0b)]
