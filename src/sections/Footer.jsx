import { useLanguage } from '../i18n/LanguageProvider';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative z-20 flex flex-col items-center gap-4 border-t border-white/10 bg-[#0a0806] px-6 py-10 text-sm text-white/40 sm:flex-row sm:justify-between sm:px-12">
      <span>© {new Date().getFullYear()} Amelia Núñez</span>
      <div className="flex gap-6">
        <a href="#" className="footer-link">
          {t.footer.github}
        </a>
        <a href="#" className="footer-link">
          {t.footer.linkedin}
        </a>
        <a href="#" className="footer-link">
          {t.footer.twitter}
        </a>
      </div>
    </footer>
  );
}
