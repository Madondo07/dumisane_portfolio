import '../src/index.css';
import '../src/styles/navbar.css';
import '../src/styles/footer.css';
import '../src/styles/hero.css';
import '../src/styles/projects.css';
import '../src/styles/skills.css';
import '../src/styles/skills-stats.css';
import '../src/styles/contact.css';
import '../src/styles/academic.css';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import heroFallback from '../src/assets/intro.png';
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
        <Navbar />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}
