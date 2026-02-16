import '../src/index.css';
import '../src/components/navbar.css';
import '../src/components/footer.css';
import '../src/components/hero.css';
import '../src/components/projects.css';
import '../src/components/skills.css';
import '../src/components/skills-stats.css';
import '../src/components/contact.css';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import heroFallback from '../src/assets/intro.png';
const ThemeToggle = dynamic(() => import('../src/components/ThemeToggle'), { ssr: false });
const Navbar = dynamic(() => import('../src/components/Navbar'), { ssr: false });
import Footer from '../src/components/Footer';

export default function MyApp(props) {
  const Component = props.Component;
  const pageProps = props.pageProps;
  return (
    <>
      <Head>
        {/* preload hero image to improve LCP discovery */}
        <link rel="preload" as="image" href={heroFallback.src} />
      </Head>
      <div className="min-h-screen app-root">
        <ThemeToggle />
        <Navbar />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}
