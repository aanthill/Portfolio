import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlurText from '../../components/BlurText';
import Marquee from './Marquee';
import { useLanguage } from '../i18n/LanguageProvider';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const { t, lang } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-reveal', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-20 overflow-hidden bg-[#0a0806] pt-28 sm:pt-36"
    >
      <div className="contact-reveal mx-auto max-w-4xl px-6 text-center sm:px-12">
        <span className="section-eyebrow">{t.contact.eyebrow}</span>

        <div className="mt-6 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
          <BlurText
            key={`contact-heading-${lang}`}
            text={t.contact.headingPre}
            delay={40}
            animateBy="words"
            direction="top"
            className="m-0 font-['Instrument_Serif'] text-4xl leading-tight text-white sm:text-6xl"
          />
          <span className="text-highlight font-['Instrument_Serif'] text-4xl leading-tight sm:text-6xl">
            {t.contact.headingHighlight}
            {t.contact.headingEnd}
          </span>
        </div>

        <p className="mx-auto mt-6 max-w-md text-white/60">{t.contact.paragraph}</p>
        <a href="mailto:hello@example.com" className="cta-button">
          {t.contact.cta}
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="mt-24">
        <Marquee text={t.contact.marquee} speed={30} />
      </div>
    </section>
  );
}
