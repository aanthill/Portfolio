import { Languages } from 'lucide-react';
import { useLenis } from '../lenis/SmoothScroll';
import { useLanguage } from '../i18n/LanguageProvider';

export default function SiteHeader() {
  const lenisRef = useLenis();
  const { lang, t, toggleLang } = useLanguage();

  const links = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.work, href: '#work' },
    { label: t.nav.contact, href: '#contact' },
  ];

  const handleNavClick = (event, href) => {
    event.preventDefault();
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(href, { offset: -64, duration: 1.3 });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="portfolio-header">
      <a href="#hero" className="portfolio-logo" onClick={(e) => handleNavClick(e, '#hero')}>
        Amelia Núñez
      </a>
      <nav className="portfolio-nav">
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
            {link.label}
          </a>
        ))}
        <button
          type="button"
          className="lang-toggle"
          onClick={toggleLang}
          aria-label={lang === 'en' ? 'Cambiar a Español' : 'Switch to English'}
        >
          <Languages size={15} strokeWidth={1.75} aria-hidden="true" />
          <span>{lang === 'en' ? 'ES' : 'EN'}</span>
        </button>
      </nav>
    </header>
  );
}
