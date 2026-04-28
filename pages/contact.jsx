import Head from 'next/head';
import Contact from '../src/components/Contact';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact | Dumisane Madondo</title>
        <meta name="description" content="Get in touch with Dumisane Madondo. Open to freelance work, collaborations, and new opportunities." />
      </Head>
      <Contact />
    </>
  );
}
