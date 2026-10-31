import LanguageProvider from './i18n/LanguageProvider';
import SmoothScroll from './lenis/SmoothScroll';
import SiteHeader from './sections/SiteHeader';
import Hero from './sections/Hero';
import About from './sections/About';
import Work from './sections/Work';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

const App = () => {
  return (
    <LanguageProvider>
      <SmoothScroll>
        <div className="relative w-full overflow-x-hidden bg-[#0a0806] text-white">
          <SiteHeader />
          <Hero />
          <About />
          <Work />
          <Contact />
          <Footer />
        </div>
      </SmoothScroll>
    </LanguageProvider>
  );
};

export default App;
