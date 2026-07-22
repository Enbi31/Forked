import HeroSection from '@/components/landing/herosection';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-950 via-zinc-950 to-zinc-950">
      <HeroSection onSearch={() => {}} />
    </main>
  );
}
