import Head from 'next/head';
import Contact from '../src/components/Contact';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact | Dumisane Madondo</title>
        <meta name="description" content="Get in touch with Dumisane Madondo. Open to freelance work, collaborations, and new opportunities." />
        {/* Open Graph — used by WhatsApp, Telegram, Facebook, LinkedIn */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dumisanemm.co.za/contact" />
        <meta property="og:title" content="Contact | Dumisane Madondo" />
        <meta property="og:description" content="Get in touch with Dumisane Madondo. Open to freelance work, collaborations, and new opportunities." />
        <meta property="og:image" content="https://www.dumisanemm.co.za/logoicon2.png" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact | Dumisane Madondo" />
        <meta name="twitter:description" content="Get in touch with Dumisane Madondo. Open to freelance work, collaborations, and new opportunities." />
        <meta name="twitter:image" content="https://www.dumisanemm.co.za/logoicon2.png" />
      </Head>
      <Contact />
    </>
  );
}
