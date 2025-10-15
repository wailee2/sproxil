import React from "react";
import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function AnimatedArrowButton({
  label = null,
  to = null,
  onClick = undefined,
  exitTranslate = "",
  incomingFrom = "",
  children = null,
  ariaLabel = "",
  scrollOffset = 0,

  // NEW props for customization:
  labelClass = "bg-red-950 text-white",
  iconCircleBg = "bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400",
  iconTextColor = "text-red-950",
}) {
  const outer = `group inline-flex items-center gap-1`.trim();

  // animation classes for the inner icon wrapper only
  const iconAnim = `transform transition-all duration-500 ease-in-out`;

  const originalIconCls = `${iconAnim} opacity-100 group-hover:${exitTranslate} group-hover:-translate-y-6 group-hover:translate-x-6 -rotate-45 group-hover:opacity-0`;
  const incomingIconCls = `${iconAnim} ${incomingFrom} opacity-0 group-hover:translate-x-0 group-hover:rotate-0 group-hover:opacity-100 -translate-x-6 -rotate-12`;

  function handleHashClick(e, hash) {
    if (e) e.preventDefault();
    const id = hash.startsWith("#") ? hash.slice(1) : hash;
    const target =
      document.getElementById(id) || document.querySelector(`[name="${id}"]`);
    if (!target) {
      window.location.hash = hash;
      return;
    }
    const targetY = target.getBoundingClientRect().top + window.pageYOffset - (scrollOffset || 0);
    window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
    if (typeof onClick === "function") onClick();
  }

  const content = (
    <>
      {label && !children && (
        <button
          type={to ? undefined : "button"}
          className={
            `inline-flex items-center rounded-full ${labelClass} p-4 lg:p-5 text-md md:text-lg shadow transition-transform duration-200 cursor-pointer bg-[#f5f9f5]`
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

      <div
        className={`p-7 lg:p-7.5 rounded-full text-[1.7rem] ${iconCircleBg} ${iconTextColor} shadow-md flex items-center justify-center relative overflow-hidden`}
        aria-hidden={false}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none ">
          <span className={originalIconCls}>
            <IoArrowForward className={`text-[1.7rem]`} />
          </span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className={incomingIconCls}>
            <IoArrowForward className={`text-[1.7rem]`} />
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
/*<AnimatedArrowButton
  label="Try now"
  to="/signup"
  labelBgClass="bg-sky-700"
  circleBgClass="bg-gradient-to-r from-sky-500 via-indigo-500 to-indigo-700"
  iconColorClass="text-white"
/>*/