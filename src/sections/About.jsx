import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlurText from '../../components/BlurText';
import SkillsCoverflow from './SkillsCoverflow';
import { useLanguage } from '../i18n/LanguageProvider';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const { t, lang } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-reveal', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-20 bg-[#0a0806] px-6 py-28 sm:px-12 lg:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="about-reveal">
            <span className="section-eyebrow">{t.about.eyebrow}</span>
            <BlurText
              key={`about-heading-${lang}`}
              text={t.about.heading}
              delay={40}
              animateBy="words"
              direction="top"
              className="m-0 mt-4 font-['Instrument_Serif'] text-4xl leading-tight text-white sm:text-5xl"
            />
          </div>

          <div className="about-reveal">
            <p className="text-lg leading-relaxed text-white/70">{t.about.paragraph}</p>
          </div>
        </div>

        <div className="about-reveal mt-20">
          <SkillsCoverflow />
        </div>
      </div>
    </section>
  );
}
