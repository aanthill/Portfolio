import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BackgroundEffect from '../../components/BackgroundEffect';
import BlurText from '../../components/BlurText';
import Marquee from './Marquee';
import { useLanguage } from '../i18n/LanguageProvider';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const { t, lang } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // As the hero scrolls away, ease its 3D background back rather than
      // just cutting it off — a soft release instead of a hard pin.
      gsap.to(bgRef.current, {
        opacity: 0.2,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* EFECTO DE FONDO 3D — no tocar */}
      <div ref={bgRef} className="absolute inset-0">
        <BackgroundEffect imageSrc="/textures/wall.jpg" depthSrc="/textures/wall-depth.webp" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black" />

      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center gap-6 px-4 text-center">
        <span className="hero-badge">{t.hero.badge}</span>

        <BlurText
          key={`hero-heading-${lang}`}
          text={t.hero.heading}
          delay={150}
          animateBy="words"
          direction="top"
          className="m-0 w-full max-w-3xl justify-center text-center font-['Instrument_Serif'] text-[clamp(2rem,6vw,4.5rem)] leading-[1.05] text-white drop-shadow-2xl"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20">
        <Marquee text={t.hero.marquee} />
      </div>
    </section>
  );
}
