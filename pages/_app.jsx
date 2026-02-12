import '../src/index.css';
import '../src/components/navbar.css';
import '../src/components/footer.css';
import '../src/components/hero.css';
import '../src/components/projects.css';
import '../src/components/skills.css';
import '../src/components/skills-stats.css';
import '../src/components/contact.css';
import dynamic from 'next/dynamic';
const ThemeToggle = dynamic(() => import('../src/components/ThemeToggle'), { ssr: false });
const Navbar = dynamic(() => import('../src/components/Navbar'), { ssr: false });
import Footer from '../src/components/Footer';

export default function MyApp(props) {
  const Component = props.Component;
  const pageProps = props.pageProps;
  return (
    <div className="min-h-screen app-root">
      <ThemeToggle />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
