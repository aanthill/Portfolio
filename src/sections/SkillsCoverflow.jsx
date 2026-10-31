import { useCallback, useEffect, useRef, useState } from 'react';
import { skills } from '../data/skillLogos';

const VISIBLE_RANGE = 3;
const SPACING = 74;
const ROTATION = 36;
const AUTO_ADVANCE_MS = 2200;

function getCircularOffset(index, activeIndex, total) {
  let raw = index - activeIndex;
  if (raw > total / 2) raw -= total;
  if (raw < -total / 2) raw += total;
  return raw;
}

export default function SkillsCoverflow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = skills.length;
  const timerRef = useRef(null);
  const pausedRef = useRef(false);

  const advance = useCallback(
    (direction = 1) => {
      setActiveIndex((prev) => (prev + direction + total) % total);
    },
    [total]
  );

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      if (!pausedRef.current) advance(1);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timerRef.current);
  }, [advance]);

  return (
    <div
      className="skills-coverflow"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div className="skills-coverflow-stage">
        {skills.map((skill, index) => {
          const offset = getCircularOffset(index, activeIndex, total);
          const abs = Math.abs(offset);
          const hidden = abs > VISIBLE_RANGE;

          const style = {
            transform: `translate(-50%, -50%) translateX(${offset * SPACING}px) rotateY(${-offset * ROTATION}deg) scale(${Math.max(1 - abs * 0.18, 0.42)})`,
            opacity: hidden ? 0 : Math.max(1 - abs * 0.3, 0),
            zIndex: 100 - abs,
            pointerEvents: hidden ? 'none' : 'auto',
          };

          return (
            <button
              key={skill.title}
              type="button"
              className={`skills-coverflow-item${offset === 0 ? ' is-active' : ''}`}
              style={style}
              onClick={() => setActiveIndex(index)}
              aria-label={skill.title}
              tabIndex={hidden ? -1 : 0}
            >
              <img src={skill.src} alt={skill.title} loading="lazy" decoding="async" draggable={false} />
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => advance(-1)}
          aria-label="Previous skill"
          className="skills-coverflow-arrow skills-coverflow-arrow--prev"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => advance(1)}
          aria-label="Next skill"
          className="skills-coverflow-arrow skills-coverflow-arrow--next"
        >
          ›
        </button>
      </div>

      <span className="skills-coverflow-caption">{skills[activeIndex].title}</span>
    </div>
  );
}
