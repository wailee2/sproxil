import React, { useState } from 'react'

/**
 * AnimatedUnderline
 *
 * A small, customizable React component that shows an underline that:
 *  - grows left -> right on hover/focus
 *  - when the cursor leaves, the underline exits by sliding to the right
 *
 * Usage:
    <AnimatedUnderline
      as="a" href="/about"
      className=' bg-green-700'
    >
      <span className='bg-amber-500  footer-link'>{n.name}</span>
    </AnimatedUnderline>
 *
 * Props:
 *  - as: string (element tag to render, e.g. 'span'|'a'|'div')
 *  - children: ReactNode
 *  - className: extra classes for wrapper
 *  - color: any valid CSS color for the underline (default: currentColor)
 *  - thickness: number (px) thickness of the underline (default: 2)
 *  - durationEnter: ms for grow animation (default: 300)
 *  - durationExit: ms for exit slide animation (default: 240)
 */

export default function AnimatedUnderline({
  as = 'span',
  children,
  className = "bg-red-500",
  color = 'currentColor',
  thickness = 2,
  durationEnter = 1000,
  durationExit = 500,
  ...rest
}) {
  const Tag = as
  // 'idle' => hidden (scaleX(0))
  // 'enter' => growing (scaleX(1) from left)
  // 'exit' => slides right (translateX(100%) while scaleX(1))
  const [state, setState] = useState('idle')

  const handleEnter = () => setState('enter')
  const handleLeave = () => setState('exit')

  const onUnderlineTransitionEnd = (e) => {
    // only reset to idle after the exit animation completes
    if (state === 'exit') setState('idle')
  }

  // inline style driven so users can customize color/thickness easily
  const underlineStyle = {
    '--underline-color': color,
    '--underline-thickness': `${thickness}px`,
    transitionProperty: 'transform',
    transitionDuration: `${state === 'enter' ? durationEnter : durationExit}ms`,
    transitionTimingFunction:
      state === 'enter' ? 'cubic-bezier(0.2, 0.9, 0.2, 1)' : 'cubic-bezier(0.4, 0, 0.2, 1)',
    transform:
      state === 'enter'
        ? 'scaleX(1) translateX(0)'
        : state === 'exit'
        ? 'translateX(100%) scaleX(1)'
        : 'scaleX(0) translateX(0)',
    transformOrigin: 'left center',
  }

  // wrapper needs a little bottom padding so the underline doesn't overlap text
  const wrapperStyle = {
    paddingBottom: `${Math.max(2, thickness) + 2}px`,
  }

  return (
    <Tag
      className={`relative inline-block overflow-hidden w-fit `}
      onMouseEnter={handleEnter}
      onFocus={handleEnter}
      onMouseLeave={handleLeave}
      onBlur={handleLeave}
      style={wrapperStyle}
      {...rest}
    >
      {children}

      {/* underline element */}
      <span
        aria-hidden
        onTransitionEnd={onUnderlineTransitionEnd}
        style={underlineStyle}
        className={`pointer-events-none rounded-full absolute left-0 bottom-1 w-full ${className} h-[var(--underline-thickness)] bg-[var(--underline-color)] transform will-change-transform`}
      />
    </Tag>
  )
}

/*
Notes & tips:
 - This uses inline CSS variables so you can pass any color string (hex, rgb, tailwind using style fallback, etc.)
 - If you want the underline to be a fixed color from Tailwind classes instead of `color` prop, set color to a CSS color string, e.g. '#16a34a' or 'rgba(0,0,0,0.8)'.
 - The component is keyboard-accessible: focus triggers the same enter animation.
 - If you want the underline to be centered under the text, reduce `paddingBottom` or style the wrapper externally.

 
*/

