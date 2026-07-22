import { useLocation } from 'wouter';

export default function Navbar() {
  const [, navigate] = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#07070B]/70 backdrop-blur-xl border-b border-[rgba(168,85,247,0.12)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white font-semibold text-lg cursor-pointer">
            <span className="text-2xl">⚡</span>
            <span>Fork</span>
          </button>
          <button onClick={() => navigate('/app')} className="px-5 py-2 bg-gradient-to-r from-[#7C3AED] to-[#A855F7] hover:from-[#8B4AF7] hover:to-[#B565F7] text-white text-sm font-semibold rounded-xl glow-button transition-all duration-300 cursor-pointer">
            Launch App
          </button>
        </div>
      </div>
    </nav>
  );
}
