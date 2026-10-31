import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Infinite horizontal marquee band, inspired by the repeated-CTA scroll
 * bands on flshfrm.com — recolored to the site's orange/yellow accent.
 */
export default function Marquee({ text = 'AVAILABLE FOR WORK', repeat = 8, speed = 36 }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const halfWidth = track.scrollWidth / 2;
    const tween = gsap.fromTo(
      track,
      { x: 0 },
      { x: -halfWidth, duration: speed, ease: 'none', repeat: -1 }
    );

    return () => tween.kill();
  }, [speed, text, repeat]);

  const items = Array.from({ length: repeat });

  return (
    <div className="marquee-band">
      <div ref={trackRef} className="marquee-track">
        {items.concat(items).map((_, i) => (
          <span key={i} className="marquee-item">
            {text}
            <span className="marquee-dot" aria-hidden="true">
              ●
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
