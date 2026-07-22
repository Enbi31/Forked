import { useLocation } from 'wouter';
import Navbar from '@/components/landing/navbar';
import HomeHero from '@/components/landing/home-hero';
import HowItWorks from '@/components/landing/how-it-works';
import Footer from '@/components/landing/footer';

export default function Home() {
  const [, navigate] = useLocation();

  return (
    <main className="bg-[#07070B] min-h-screen">
      <div className="noise" />
      <Navbar />
      <HomeHero onLaunch={() => navigate('/app')} />
      <HowItWorks />
      <Footer />
    </main>
  );
}
