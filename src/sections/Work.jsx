import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlurText from '../../components/BlurText';
import { useLanguage } from '../i18n/LanguageProvider';

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const sectionRef = useRef(null);
  const { t, lang } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch('.work-card', {
        start: 'top 85%',
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
            overwrite: true,
          }),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative z-20 bg-[#0a0806] px-6 py-28 sm:px-12 lg:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <span className="section-eyebrow">{t.work.eyebrow}</span>
        <BlurText
          key={`work-heading-${lang}`}
          text={t.work.heading}
          delay={40}
          animateBy="words"
          direction="top"
          className="m-0 mt-4 max-w-2xl font-['Instrument_Serif'] text-4xl leading-tight text-white sm:text-5xl"
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {t.work.projects.map((project) => (
            <a key={project.title} href="#" className="work-card">
              <div className="work-card-inner">
                <span className="work-card-arrow" aria-hidden="true">
                  ↗
                </span>
                <span className="work-card-tag">{project.tag}</span>
                <h3 className="work-card-title">{project.title}</h3>
                <span className="work-card-year">{project.year}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
